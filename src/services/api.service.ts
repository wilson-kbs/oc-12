export class ApiService {
  private static fakeData?: Record<string, any>;

  private static get isPreview() {
    return import.meta.env.VITE_MODE === "preview";
  }

  private static get apiUrl() {
    return import.meta.env.VITE_API_URL;
  }

  private static async getFakeData(): Promise<Record<string, any>> {
    if (this.fakeData) {
      return this.fakeData;
    }

    const response = await fetch("/preview/data.json");
    this.fakeData = await response.json();
    return this.fakeData as Record<string, any>;
  }

  public static async getActivity(userId: number) {
    if (this.isPreview) {
      const data = await this.getFakeData();
      return data["activities"];
    }

    return this.fetch(`${this.apiUrl}/user/${userId}/activity`);
  }

  public static async getPerformance(userId: number) {
    if (this.isPreview) {
      const data = await this.getFakeData();
      return data["performance"];
    }

    return this.fetch(`${this.apiUrl}/user/${userId}/performance`);
  }

  public static async getSessions(userId: number) {
    if (this.isPreview) {
      const data = await this.getFakeData();
      return data["sessions"];
    }

    return this.fetch(`${this.apiUrl}/user/${userId}/average-sessions`);
  }

  public static async getUser(userId: number) {
    if (this.isPreview) {
      const { id, userInfos, todayScore, keyData } = await this.getFakeData();
      return {
        id,
        userInfos,
        todayScore,
        keyData,
      };
    }

    return this.fetch(`${this.apiUrl}/user/${userId}`);
  }

  private static async fetch(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  }

  public static async init() {
    if (this.isPreview) {
      const response = await fetch("/preview/data.json");
      this.fakeData = await response.json();
      console.log("Fake data loaded", this.fakeData);
    }
  }
}

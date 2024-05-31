import { Activity, Performance, Session, User } from "src/types";

export class ApiService {
  private static fakeData?: Record<string, unknown>;

  private static get isPreview() {
    return import.meta.env.MODE === "preview";
  }

  private static get apiUrl() {
    return import.meta.env.VITE_API_URL || "";
  }

  private static async getFakeData(): Promise<Record<string, unknown>> {
    if (this.fakeData) {
      return this.fakeData;
    }

    const response = await fetch(import.meta.env.VITE_FAKE_DATA_URL);
    this.fakeData = await response.json();
    return this.fakeData as Record<string, unknown>;
  }

  public static async getActivity(userId: number): Promise<Activity[]> {
    if (this.isPreview) {
      const data = await this.getFakeData();
      return data["activities"] as Activity[];
    }

    const result = await this.fetch(`${this.apiUrl}/user/${userId}/activity`);

    return result.data.sessions;
  }

  public static async getPerformance(userId: number): Promise<Performance> {
    if (this.isPreview) {
      const data = await this.getFakeData();
      return data["performance"] as Performance;
    }

    const result = await this.fetch(
      `${this.apiUrl}/user/${userId}/performance`,
    );

    return result.data;
  }

  public static async getSessions(userId: number): Promise<Session[]> {
    if (this.isPreview) {
      const data = await this.getFakeData();
      return data["sessions"] as Session[];
    }

    const result = await this.fetch(
      `${this.apiUrl}/user/${userId}/average-sessions`,
    );

    return result.data.sessions;
  }

  public static async getUser(userId: number): Promise<User> {
    if (this.isPreview) {
      const { id, userInfos, todayScore, keyData } = await this.getFakeData();
      return {
        id,
        userInfos,
        todayScore,
        keyData,
      } as User;
    }

    const result = await this.fetch(`${this.apiUrl}/user/${userId}`);

    return result.data;
  }

  private static async fetch(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  }
}

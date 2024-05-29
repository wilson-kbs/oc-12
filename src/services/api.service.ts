import { Activity, Performance, Session, User } from "src/types";

export class ApiService {
  private static fakeData?: Record<string, unknown>;

  private static get isPreview() {
    return import.meta.env.VITE_MODE === "preview";
  }

  private static get apiUrl() {
    return import.meta.env.VITE_API_URL;
  }

  private static async getFakeData(): Promise<Record<string, unknown>> {
    if (this.fakeData) {
      return this.fakeData;
    }

    const response = await fetch("/preview/data.json");
    this.fakeData = await response.json();
    return this.fakeData as Record<string, unknown>;
  }

  public static async getActivity(userId: number): Promise<Activity[]> {
    if (this.isPreview) {
      const data = await this.getFakeData();
      return data["activities"] as Activity[];
    }

    return this.fetch(`${this.apiUrl}/user/${userId}/activity`);
  }

  public static async getPerformance(userId: number): Promise<Performance> {
    if (this.isPreview) {
      const data = await this.getFakeData();
      return data["performance"] as Performance;
    }

    return this.fetch(`${this.apiUrl}/user/${userId}/performance`);
  }

  public static async getSessions(userId: number): Promise<Session[]> {
    if (this.isPreview) {
      const data = await this.getFakeData();
      return data["sessions"] as Session[];
    }

    return this.fetch(`${this.apiUrl}/user/${userId}/average-sessions`);
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

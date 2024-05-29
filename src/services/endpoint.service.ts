export class EndpointService {
  static user(id: number) {
    return `/user/${id}`;
  }

  static activity(userId: number) {
    return `${EndpointService.user(userId)}/activity`;
  }

  static performance(userId: number) {
    return `${EndpointService.user(userId)}/performance`;
  }

  static session(userId: number) {
    return `${EndpointService.user(userId)}/average-sessions`;
  }
}

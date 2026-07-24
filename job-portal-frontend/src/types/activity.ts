export interface Activity {
  id: number;
  title: string;
  description: string;
  type: string;
  createdAt: string;
}

export interface ActivityResponse {
  activities: Activity[];
}

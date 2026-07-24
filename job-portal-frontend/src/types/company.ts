export interface Company {
  id: number;
  companyName: string;
  website: string;
  logo: string | null;
  userId: number;
}

export interface CompanyFormData {
  companyName: string;
  website: string;
}

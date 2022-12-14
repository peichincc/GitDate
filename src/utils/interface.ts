import { Timestamp, FieldValue } from "firebase/firestore";

interface FormRecipient {
  title: string;
  content: string;
  status: string;
  category?: string;
  type?: string;
  date?: string;
  time?: string;
  location?: { lat: number; lng: number };
  address?: string;
  tags?: string[];
  posted_by?: string;
  hosted_by?: string;
  posted_at: Timestamp | FieldValue;
}

interface ListData {
  lastname: string;
  firstname: string;
  age: string;
  gender: string;
  githublink: string;
  details: string;
  gender_interested: string;
  main_photo: string;
  wish_relationship: string;
  friend_sent_request: [];
}

interface LocationType {
  lat: number;
  lng: number;
}

export { FormRecipient, ListData, LocationType };

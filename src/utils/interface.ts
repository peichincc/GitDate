import { Timestamp, FieldValue } from "firebase/firestore";

interface FormRecipient {
  title: string;
  content: string;
  status: string;
  category?: string;
  type?: string;
  date?: string;
  time?: string;
  location?: { lat: string; lng: string };
  address?: string;
  tags?: string[];
  posted_by?: string;
  hosted_by?: string;
  posted_at: Timestamp | FieldValue;
}

export { FormRecipient };

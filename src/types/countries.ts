import type { UploadFile } from "antd/es/upload/interface";
import type { Dayjs } from "dayjs";

export interface FileItem {
    id: number;
    name?: string;
    file: UploadFile | null;
  }
  
export interface DateItem {
    id: number;
    place: string;
    date: Dayjs | null;
  }
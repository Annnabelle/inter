import type { UploadFile } from "antd/es/upload/interface";
import type { Dayjs } from "dayjs";
import { HexString } from "../dtos/main.dto";

export interface FileItem {
    id: number;
    name?: string;
    file: UploadFile | null;
}

export type Country = {
  id: HexString,
  name: {
        ru: string;
        uz: string;
        en: string;
  };
  comment?: string,
};
  
export interface DateItem {
    id: number;
    place: string;
    date: Dayjs | null;
}

export type SearchCountry = {
  id: HexString,
  name: {
        ru: string;
        uz: string;
        en: string;
  };
  comment?: string,
}
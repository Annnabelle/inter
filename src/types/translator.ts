import { HexString } from "../dtos/main.dto";
import { TranslatorLanguage } from "../utils/consts";

    
export type Translator = {
    id?: HexString,
    firstName: string,
    lastName: string,
    email?: string,
    phone?: string,
    status?: string,
    languages: {
      language: TranslatorLanguage,
      rating: number,
    }[],
}


export type CreateTranslatorRequest = Omit<Translator, 'id'>;
export type UpdateTranslatorRequest = Omit<Translator, 'id'>
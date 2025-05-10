import { TranslatorLanguage } from "../utils/consts";

    
export type Translator = {
    id?: string,
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
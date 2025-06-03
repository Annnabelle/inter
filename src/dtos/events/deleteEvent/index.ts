import { ErrorDto, HexString } from "../../main.dto";


export type DeleteEventDto = {
  id: HexString;
}


export type DeleteEventResponseDto = {
  success: boolean,
} | ErrorDto;
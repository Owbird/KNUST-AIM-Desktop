import { UserData } from "@/types/user"
import {atom} from "jotai"


export const userAtom = atom<UserData | undefined>()


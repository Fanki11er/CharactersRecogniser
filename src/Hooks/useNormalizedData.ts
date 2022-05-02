import { useState } from "react"
import { NormalizedCharacter } from "../Interfaces/interfaces"

const useNormalizedData = ()=> {
   const [normalizedCharacter, setNormalizedCharacter] = useState<NormalizedCharacter | undefined>(undefined);

   return {
       normalizedCharacter,
       setNormalizedCharacter,
   }
}

export default useNormalizedData;
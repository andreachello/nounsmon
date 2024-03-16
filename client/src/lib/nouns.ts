import axios from "axios";


export const generateNounSvg = (amount: number = 1) => {
    const { res } = axios.get("https://noun-api.com/beta/pfp?head=212&glasses=6")
    console.log("res", res);
    
}




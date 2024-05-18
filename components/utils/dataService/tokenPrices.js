
import axios from "axios";

export default async function tokenPricesFn() {
    const CIVPriceUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=civilization`;
    const STONEPriceUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=civfund-stone`
    try {
        let result = {
            isLoading: true,
            data: null,
            error: null,
        };
        const [CIVPriceResponse, STONEPriceResponse] = await Promise.all([
            axios.get(CIVPriceUrl),
            axios.get(STONEPriceUrl)
        ])
        result.isLoading = false;
        result.data = {
            CIV: CIVPriceResponse.data,
            STONE: STONEPriceResponse.data
        }

        return result
    } catch (error) {
        console.error(error);
        return {
            isLoading: false,
            data: null,
            error: error,
        };
    }
}

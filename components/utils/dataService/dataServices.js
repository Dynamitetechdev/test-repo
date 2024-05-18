import axios from "axios";

const cache = {};

export default async function DataServices(chainId, poolId, address) {
  const fundUrl = `https://civilization-frontend.online/dapp/getVaultInfo/${poolId}/${address}/?chainId=${chainId}`;


  try {
    let data = {
      isLoading: true,
      data: null,
      error: null,
    };

    const response = await axios.get(fundUrl);
    data.isLoading = false;
    data.data = response.data;


    return {data, isLoading: data.isLoading};
  } catch (error) {
    console.error(error);
    return {
      isLoading: false,
      data: null,
      error: error,
    };
  }
}

export const swapPartnerDetails = {
    partnerName: 'metashop.io',
    partnerAddress: process.env.PARTNER_WALLET_ADDRESS,
    partnerFeePercentage: +(process.env.PARTNER_FEE_PERCENTAGE || '200'),
};

export default swapPartnerDetails;

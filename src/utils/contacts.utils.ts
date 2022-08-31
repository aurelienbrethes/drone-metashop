const getDCContacts = () => {
    const email =
        process.env.CONTACT_EMAIL_ADDRESS || 'devs.digitalcopilote@gmail.com';
    const businessName = process.env.BUSINESS_NAME || '';
    const taxRegistration = process.env.TAX_REGISTRATION_NUMBER || '';
    return { email, businessName, taxRegistration };
};

export default getDCContacts;

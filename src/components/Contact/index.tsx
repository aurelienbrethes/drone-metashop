/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import useAppState from '@hooks/useAppState';
import Image from 'next/image';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import CustomToast from '@components/Toats/CustomToast';
import { useTranslation } from 'react-i18next';
import leftArrow from '../../../public/icons/Vector.png';

type ContactSubmitForm = {
    fullname: string;
    email: string;
    phone: string;
    message: string;
};

export default function Contact(): React.ReactElement {
    const { dispatchToggleCart } = useAppState();
    const { t } = useTranslation();

    const form = useRef<HTMLFormElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sendEmail = (data: FieldValues) => {
        emailjs
            .sendForm(
                'ninjamail',
                'ninjatemplate',
                form.current as HTMLFormElement,
                'dEMrI49vNXZFKyzRf',
            )
            .then(() => {
                toast.success(
                    <CustomToast message={t('contactForm.toast.success')} />,
                );
            })
            .catch(() => {
                toast.error(
                    <CustomToast message={t('contactForm.toast.error')} />,
                );
            });
    };

    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required(
            `${t('contactFormErrors.fullnameRequired')}`,
        ),
        email: Yup.string()
            .required(`${t('contactFormErrors.emailRequired')}`)
            .email(`${t('contactFormErrors.emailInvalid')}`),
        phone: Yup.string()
            .required(`${t('contactFormErrors.phoneRequired')}`)
            .min(10, `${t('contactFormErrors.phoneInvalid')}`),
        message: Yup.string()
            .required(`${t('contactFormErrors.messageRequired')}`)
            .min(10, `${t('contactFormErrors.messageInvalid')}`),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactSubmitForm>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data: ContactSubmitForm) => {
        sendEmail(data);
    };

    return (
        <aside className="min-h-screen p-12 overflow-auto bg-gradient-to-b from-zinc-700 to-zinc-800">
            <button
                type="button"
                className="absolute flex px-4 py-2 align-middle rounded top-4 left-4"
                onClick={() => dispatchToggleCart()}
            >
                <Image
                    src={leftArrow}
                    alt="left arrow"
                    layout="fixed"
                    width={15}
                    height={25}
                    className="duration-200 hover:scale-125"
                />
                <p className="ml-5 duration-300 hover:translate-x-2">
                    {t('modalCart.backButton')}
                </p>
            </button>
            <h3 className="mt-6 mb-2 font-bold">{t('contactForm.title')}</h3>
            <div className="flex flex-col w-full h-full overflow-y-hidden align-middle register-form">
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col my-2 ">
                        <label>{t('contactForm.fullname')}</label>
                        <input
                            placeholder={t(
                                'contactForm.placeholder.fullnamePlaceholder',
                            )}
                            type="text"
                            {...register('fullname')}
                            className={`focus:placeholder:invisible w-full mt-1 bg-transparent border-2 border-zinc-500 text-zinc-300 ${
                                errors.fullname ? 'is-invalid' : ''
                            }`}
                        />
                        <div className="text-red-600">
                            {errors.fullname?.message}
                        </div>
                    </div>
                    <div className="flex flex-col my-2 ">
                        <label>{t('contactForm.email')}</label>
                        <input
                            placeholder={t(
                                'contactForm.placeholder.emailPlaceholder',
                            )}
                            type="email"
                            {...register('email')}
                            className={`focus:placeholder:invisible w-full mt-1 bg-transparent border-2 border-zinc-500 text-zinc-300 ${
                                errors.email ? 'is-invalid' : ''
                            }`}
                        />
                        <div className="text-red-600">
                            {errors.email?.message}
                        </div>
                    </div>
                    <div className="flex flex-col my-2 ">
                        <label>{t('contactForm.phone')}</label>
                        <input
                            placeholder={t(
                                'contactForm.placeholder.phonePlaceholder',
                            )}
                            type="text"
                            {...register('phone')}
                            className={`focus:placeholder:invisible w-full mt-1 bg-transparent border-2 border-zinc-500 text-zinc-300 ${
                                errors.phone ? 'is-invalid' : ''
                            }`}
                        />
                        <div className="text-red-600">
                            {errors.phone?.message}
                        </div>
                    </div>
                    <div className="flex flex-col my-2 ">
                        <label>{t('contactForm.message')}</label>
                        <textarea
                            placeholder={t(
                                'contactForm.placeholder.messagePlaceholder',
                            )}
                            {...register('message')}
                            className={`focus:placeholder:invisible w-full mt-1 bg-transparent border-2 border-zinc-500 text-zinc-300 ${
                                errors.message ? 'is-invalid' : ''
                            }`}
                            cols={50}
                            rows={5}
                        />
                        <div className="text-red-600">
                            {errors.message?.message}
                        </div>
                    </div>
                    <div className="">
                        <button
                            className="flex justify-center px-6 py-4 mt-8 font-semibold tracking-widest rounded bg-zinc-500 right-16 hover:bg-white/20 drop-shadow-xl hover:drop-shadow-2xl"
                            type="submit"
                        >
                            {t('contactForm.send')}
                        </button>
                    </div>
                </form>
            </div>
        </aside>
    );
}

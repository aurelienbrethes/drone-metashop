/* This example requires Tailwind CSS v2.0+ */
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import ContactButton from '@components/UI/ContactButton';
import BuyButton from '@components/UI/BuyButton';
import Lang from '@components/UI/Lang';
import { useTranslation } from 'react-i18next';

// Options for opacity animation menu dropdown
const variations = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

export default function NavBar() {
    const { t } = useTranslation();

    const navLinks = [
        {
            index: 0,
            label: 'Home',
            path: '#home',
            effectDuration: 0.4,
        },
        {
            index: 1,
            label: 'Images',
            path: '#images',
            effectDuration: 0.6,
        },
        {
            index: 2,
            label: 'Characteristics',
            path: '#characteristics',
            effectDuration: 0.8,
        },
    ];

    return (
        <Disclosure
            as="nav"
            className="fixed top-0 z-10 flex flex-col w-full h-0 lg:items-center sm:h-20 lg:h-28 bg-neutral-800"
        >
            {({ open }) => (
                <>
                    <div className="hidden sm:block">
                        <Lang />
                    </div>
                    <div className="flex items-center w-full h-full lg:w-1/2 sm:w-2/3">
                        <div className="w-full h-1 sm:h-16">
                            <div className="flex items-center justify-center h-1 sm:h-full">
                                <div className="hidden w-full sm:block">
                                    <nav className="flex justify-around w-full mt-6 mb-6">
                                        {navLinks.map((link) => (
                                            <div
                                                key={link.index}
                                                className="duration-300 ease-in-out hover:translate-y-1"
                                            >
                                                <a
                                                    className="py-3"
                                                    href={link.path}
                                                >
                                                    {t(
                                                        `navBar.label${link.label}`,
                                                    )}
                                                </a>
                                            </div>
                                        ))}
                                        <ContactButton />
                                    </nav>
                                </div>
                            </div>

                            {/* Profile dropdown */}

                            <div className="flex justify-between sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-white rounded-md focus:outline-none ">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XIcon
                                            className="absolute z-10 w-8 h-8 hover:scale-125 top-6 right-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <MenuIcon
                                            className="absolute z-10 w-12 h-12 p-2 rounded-lg hover:bg-zinc-700 bg-zinc-800 top-4 right-4"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>
                    <BuyButton
                        spanClass="w-full"
                        buttonClass="absolute z-30 w-48 py-4 text-sm font-semibold tracking-wider rounded md:w-60 top-4 lg:px-7 left-3 sm:right-3 sm:bg-transparent sm:left-auto lg:top-8 hover:bg-zinc-700 bg-zinc-800 text-bold lg:bg-zinc-700 lg:hover:bg-white/30 drop-shadow-xl hover:drop-shadow-2xl"
                    />
                    <Disclosure.Panel className="w-full sm:hidden">
                        <motion.div
                            variants={variations}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                duration: 1,
                            }}
                        >
                            <Disclosure.Button className="w-full ">
                                <Lang />

                                <nav className="flex flex-col items-start px-4 pt-16 pb-3 space-y-1 bg-neutral-800">
                                    {navLinks.map((link) => (
                                        <div
                                            key={link.index}
                                            className="py-2 duration-500 ease-in-out hover:translate-y-1"
                                        >
                                            <motion.div
                                                animate={{ x: 40 }}
                                                transition={{
                                                    ease: 'easeOut',
                                                    duration:
                                                        link.effectDuration,
                                                }}
                                                variants={variations}
                                            >
                                                <a
                                                    className="-ml-10"
                                                    href={link.path}
                                                >
                                                    {t(
                                                        `navBar.label${link.label}`,
                                                    )}
                                                </a>
                                            </motion.div>
                                        </div>
                                    ))}

                                    <motion.div
                                        animate={{ x: 40 }}
                                        transition={{
                                            ease: 'easeOut',
                                            duration: 1,
                                        }}
                                    >
                                        <ContactButton />
                                    </motion.div>
                                </nav>
                            </Disclosure.Button>
                        </motion.div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

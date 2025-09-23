import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid'

export const AddressAndContact = () => (
    <div className="mb-6 md:mb-0">
        <span className="self-center text-xl font-semibold whitespace-nowrap">
            Precision Proteomics Center Davos
        </span>
        <div className="text-sm text-gray-400 mt-2 space-y-1">
            <p>
                <a href='https://maps.app.goo.gl/6uEb99trRzCVJxP67' target='_blank' className='flex flex-row space-x-1'>
                    <MapPinIcon className='w-5 h-5' />
                    <span>Herman Burchard Strasse 9, 7265 Davos, Switzerland</span>
                </a>
            </p>
            <p>
                <a href="mailto:christoph.messner@siaf.uzh.ch" className="flex flex-row space-x-1">
                    <EnvelopeIcon className='w-5 h-5' />
                    <span>Contact us</span>
                </a>
            </p>
        </div>
    </div>
);

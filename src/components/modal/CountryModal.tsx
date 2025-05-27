import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import SkeletonLoader from '@/components/loaders/SkeletonLoader';
import fetchApiData from '@/config/fetch-api-data';
import Modal from './Modal';

interface Country {
  name: string;
  phone_code: string;
  web_code: string;
  country_code: string;
  phone_number_length: number;
  flag: string;
}

interface Props {
  setCountryModalOpen: any;
  setSelectedCountry: any;
  selectedCountry?: Country;
  onClose: any;
}

export const CountryModal: React.FC<Props> = ({
  setCountryModalOpen,
  setSelectedCountry,
  selectedCountry,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [isLoading, setLoading] = useState(false);

  const getCountries = async () => {
    setLoading(true);
    try {
      const responseData = await fetchApiData<any>('core/list-countries/');
      const { status_code, data } = responseData;
      if (status_code === 6000) {
        setAllCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      const filteredData = allCountries?.filter((item: Country) => {
        return item?.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredCountries(filteredData);
    } else {
      setFilteredCountries(allCountries);
    }
  }, [searchTerm, allCountries]);

  const useOutsideClick = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setCountryModalOpen(false);
        }
      };
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [ref]);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef);

  return (
    <Modal isOpen={setCountryModalOpen} onClose={onClose}>
      <div className="bg-white rounded-lg w-full max-w-xs p-7" ref={wrapperRef}>
        <div className="flex items-center px-[12px] py-[8px] border-[#dae3ed] rounded-[8px] border-[1px] border-solid">
          <span className="w-[20px] h-[20px] mr-2">
            <Image
              width={100}
              height={100}
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/Path-5.svg"
              alt="Search"
            />
          </span>
          <input
            className="w-full text-sm text-gray-700 bg-white outline-none"
            type="text"
            value={searchTerm}
            placeholder="Search Country"
            onChange={handleChange}
          />
        </div>
        <div className="mt-3 overflow-y-auto max-h-96">
          {isLoading ? (
            <SkeletonLoader />
          ) : filteredCountries?.length > 0 ? (
            <>
              {filteredCountries?.map((country: Country) => (
                <div
                  key={country.name}
                  className={`flex justify-between items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer ${selectedCountry?.web_code === country?.web_code
                      ? 'hidden'
                      : ''
                    }`}
                  onClick={() => {
                    setSelectedCountry(country);
                    setCountryModalOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3">
                      {/* <Image
                        width={100}
                        height={100}
                        className="w-full h-full"
                        src={`https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/talrop/icon/flags/${country?.web_code}.png`}
                        alt="flag"
                      /> */}
                      {country?.flag}
                    </div>
                    <span className="text-sm text-[#000]">
                      {country?.name} <span>({country?.phone_code})</span>
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            'No data found'
          )}
        </div>
      </div>

    </Modal>
  );
};

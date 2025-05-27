// app/not-found.js
import Wrapper from '@/components/includes/Wrapper';
import Image from 'next/image';
import Notfound from '../../public/assets/images/notfound.svg'
import Link from 'next/link';
import NotFoundComponent from '@/components/error-pages/NotFoundComponent';

export default function NotFound() {
    return (
        <Wrapper className='h-[90vh] flex justify-center'>
            <NotFoundComponent />
        </Wrapper>
    );
}

import CustomButton from '@/components/buttons/CustomButton';
import CustomTextInput from '@/components/input/CustomTextInput';
import StarRating from '@/components/rating/RatingComponent';
import fetchApiData from '@/config/fetch-api-data';
import postApiData from '@/config/post-api-data';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';

function RatingReviewModal({ product, setRatingModal }: { product: any, setRatingModal:any }) {
  const [currentRating, setCurrentRating] = useState<number>(product?.rating || 0);
  const [formData, setFormData] = useState<{ title?: string; review?: string; rating?: number }>({
    title:product?.title ?? "",
    review:product?.review ?? ""
  });
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});

  // Handles input change for the textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fetch product ratings
  const getProductRating = useCallback(async () => {
    try {
      const response = await fetchApiData<any>(`ratings/list-product-ratings/${product?.product?.pk}/`, { requireAuth: true });
      if (response?.status_code === 6000) {
        console.log('Product Ratings Fetched:', response.data);
      }
    } catch (error) {
      console.error('Error fetching product ratings:', error);
    }
  }, [product]);

  // Fetch product reviews
  const getProductReview = useCallback(async () => {
    try {
      const response = await fetchApiData<any>(`ratings/list-product-reviews/${product?.product?.pk}/`, { requireAuth: true });
      if (response?.status_code === 6000) {
        console.log('Product Reviews Fetched:', response.data);
      }
    } catch (error) {
      console.error('Error fetching product reviews:', error);
    }
  }, [product]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    try {
      const responseData = await postApiData<any>(`ratings/create-product-review/${product?.product?.pk}/`, {
        title: formData?.title,
        rating: currentRating,
        review: formData?.review,
      }, undefined, true);

      const { status_code, message } = responseData;

      if (status_code === 6000) {
        setFormData({});
        setRatingModal(false)
        setCurrentRating(0);
        console.log('Review submitted successfully.');
      } else if (status_code === 6001 && message?.body) {
        setErrorFields(message.body);
      } else {
        console.warn(`Unexpected status code: ${status_code}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  }, [formData, currentRating, product]);

  useEffect(() => {
    getProductReview();
    getProductRating();
  }, [getProductReview, getProductRating]);

  return (
    <div className="flex flex-col">
      <h3 className="text-[#46474A] rubik_medium text-[24px]">Create Review</h3>

      <div className="flex w-full flex-col gap-6">
        <div className="flex justify-between items-center gap-4 border-b border-solid border-primary_border">
          <div className="w-[96px] h-[104px] flex justify-center items-center">
            <Image
              src={product?.product?.primary_attachment || '/placeholder.png'}
              width={100}
              height={100}
              className="contain-content"
              alt="productImage"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="rubik_medium text-[16px] leading-[24px] text-start text-[shadow_gray]">
              {product?.product?.name || 'Product Name'}
            </h2>
          </div>
        </div>

        <div className="border-b border-solid border-primary_border">
          <h6 className="rubik_medium text-[16px]">Overall Rating</h6>
          <div className="py-2">
            <StarRating currentRating={currentRating} setCurrentRating={setCurrentRating} />
          </div>
        </div>
        <div className="border-b border-solid border-primary_border">
          <CustomTextInput
            className=""
            placeholder="What’s most important to know?"
            name="title"
            type="text"
            label="Add a headline"
            value={formData.title || ''}
            setData={setFormData}
            isError={!!errorFields.title}
            errorFields={errorFields}
            setErrorFields={setErrorFields}
          />
        </div>
        <div>
          <h6 className="rubik_medium text-[16px] mb-3">Add a written review</h6>
          <textarea
            id="review"
            name="review"
            placeholder="Write your review here..."
            value={formData.review || ''}
            rows={4}
            onChange={handleTextareaChange}
            className="border border-solid border-input_border rounded-[4px] w-full p-2 mb-1"
          />
        </div>
        <CustomButton
          title="Submit Review"
          buttonClass="bg-[#FFE000]"
          onClick={handleSubmit}
          isButtonClass={true}
          istTitleClass={true}
          titleClass="text-[#040C13] rubik_medium text-[16px]"
        />
      </div>
    </div>
  );
}

export default RatingReviewModal;

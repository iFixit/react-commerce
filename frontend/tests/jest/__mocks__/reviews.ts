import { ProductReview, ProductReviewData } from '@models/product/reviews';

export const getReviewsResponse = (
   type: 'filled' | 'empty' = 'filled'
): ProductReviewData => {
   let reviews: ProductReview[] = mockedReviews;

   if (type === 'empty') {
      reviews = [];
   }

   return {
      reviews: reviews,
      count: reviews.length,
      average:
         reviews.length == 0
            ? 0
            : reviews.reduce((total, next) => total + (next.rating || 0), 0) /
              reviews.length,
      groupedReviews: {
         1: reviews.filter((review) => review.rating == 1).length,
         2: reviews.filter((review) => review.rating == 2).length,
         3: reviews.filter((review) => review.rating == 3).length,
         4: reviews.filter((review) => review.rating == 4).length,
         5: reviews.filter((review) => review.rating == 5).length,
      },
   };
};

const mockedReviews: ProductReview[] = [
   {
      reviewid: 37443,
      rating: 5,
      headline: 'Cool and useful at the same time',
      productName: 'Precision Cleaning Kit',
      productVariantName: 'New',
      body: 'As advertised and solved our problem.',
      date: '<time   title="Thu, 03 Nov 2022 04:19:46 -0700" datetime="2022-11-03T04:19:46-07:00">Nov 3, 2022</time>',
      created_date: 1667474386,
      modified_date: 1667474465,
      langid: 'en',
      author: {
         userid: 3081773,
         name: 'MARVIN STABLER',
         avatar:
            'https://www.cominor.com/static/images/avatars/User/ifixit/avatar-9.thumbnail',
         url: 'https://www.cominor.com/User/3081773/MARVIN+STABLER',
         canEdit: true,
      },
   },
   {
      reviewid: 37196,
      rating: 5,
      headline: null,
      productName: 'Precision Cleaning Kit',
      productVariantName: 'New',
      body: 'Absolutely amazing very hopeful for cleaning',
      date: '<time   title="Mon, 17 Oct 2022 05:33:22 -0700" datetime="2022-10-17T05:33:22-07:00">Oct 17, 2022</time>',
      created_date: 1666010002,
      modified_date: 1666010027,
      langid: 'en',
      author: {
         userid: 4188334,
         name: 'Tristan Johnson',
         avatar: 'https://www.cominor.com/igi/WAEVRfFYkudpZf61.thumbnail',
         url: 'https://www.cominor.com/User/4188334/Tristan+Johnson',
         canEdit: true,
      },
   },
   {
      reviewid: 35622,
      rating: 4,
      headline: null,
      productName: 'Precision Cleaning Kit',
      productVariantName: 'New',
      body: 'Gives you a lot of the necessities you would need to give items you are repairing a nice cleaning',
      date: '<time   title="Fri, 24 Jun 2022 07:51:29 -0700" datetime="2022-06-24T07:51:29-07:00">Jun 24, 2022</time>',
      created_date: 1656082289,
      modified_date: 1656082657,
      langid: 'en',
      author: {
         userid: 4145501,
         name: 'Quin',
         avatar: 'https://www.cominor.com/igi/m2cwXWJISrPR1k6T.thumbnail',
         url: 'https://www.cominor.com/User/4145501/Quin',
         canEdit: true,
      },
   },
   {
      reviewid: 37335,
      rating: 4,
      headline: null,
      productName: 'Precision Cleaning Kit',
      productVariantName: 'New',
      body: 'Amazing product',
      date: '<time   title="Wed, 26 Oct 2022 11:15:54 -0700" datetime="2022-10-26T11:15:54-07:00">Oct 26, 2022</time>',
      created_date: 1666808154,
      modified_date: 1666808154,
      langid: undefined,
      author: {
         userid: 4201790,
         name: 'donald perez',
         avatar:
            'https://www.cominor.com/static/images/avatars/User/ifixit/avatar-5.thumbnail',
         url: 'https://www.cominor.com/User/4201790/donald+perez',
         canEdit: true,
      },
   },
   {
      reviewid: 37175,
      rating: 4,
      headline: null,
      productName: 'Precision Cleaning Kit',
      productVariantName: 'New',
      body: undefined,
      date: '<time   title="Wed, 12 Oct 2022 15:28:05 -0700" datetime="2022-10-12T15:28:05-07:00">Oct 12, 2022</time>',
      created_date: 1665613685,
      modified_date: 1665613685,
      langid: undefined,
      author: {
         userid: 4174587,
         name: 'Mariano',
         avatar:
            'https://www.cominor.com/static/images/avatars/User/ifixit/avatar-9.thumbnail',
         url: 'https://www.cominor.com/User/4174587/Mariano',
         canEdit: true,
      },
   },
   {
      reviewid: 36735,
      rating: 5,
      headline: null,
      productName: 'Precision Cleaning Kit',
      productVariantName: 'New',
      body: undefined,
      date: '<time   title="Sat, 10 Sep 2022 10:34:03 -0700" datetime="2022-09-10T10:34:03-07:00">Sep 10, 2022</time>',
      created_date: 1662831243,
      modified_date: 1662831243,
      langid: undefined,
      author: {
         userid: 4181048,
         name: 'Melissa Goodwin',
         avatar:
            'https://www.cominor.com/static/images/avatars/User/ifixit/avatar-2.thumbnail',
         url: 'https://www.cominor.com/User/4181048/Melissa+Goodwin',
         canEdit: true,
      },
   },
];

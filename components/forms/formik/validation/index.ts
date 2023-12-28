import * as Yup from 'yup';

const patterns = {
  author: /^[ა-ჰ ]{4,}$/, // Allow space for multiple words
  title: /^.{4,}$/,
  email: /^[a-zA-Z\d\.-]+@redberry\.ge$/,
};

const MAX_IMAGE_SIZE_MB = 1;

export const validationSchema = Yup.object().shape({
  author: Yup.string()
    .matches(
      patterns.author,
      "მინიმუმ ორი სიმბოლო, ქართული ასოები, მინიმუმ ორი სიტყვა"
    )
    .test(
      'at-least-two-words',
      'Author must have at least 2 words with Georgian letters',
      (value: string | undefined) => {
        if (!value) return false;

        const georgianWords = value.split(/\s+/).filter((word) => /^[ა-ჰ]+$/.test(word));
        return georgianWords.length >= 2;
      }
    )
    .required("მინიმუმ ოთხი სიმბოლო, ქართული ასოები, მინიმუმ 4 სიტყვა"),
  title: Yup.string()
    .matches(patterns.title, "მინიმუმ 4 სიმბოლო")
    .required("მინიმუმ 4 სიმბოლო"),
  image: Yup.object().shape({
    name: Yup.string().required('Image name is required'),
    url: Yup.mixed().required('Image URL is required'),
    size: Yup.mixed().test('file-size', 'Image size must be less than 1 MB', function (value) {      
      if (!value) return true; // Allow for empty value

      const castedValue = value as { size?: number }; // Explicitly cast to include the 'size' property
      
      if (!castedValue) return false; // Invalid size
      

      const fileSizeInMB = Number(castedValue) / 1024 / 1024; // Convert to MB

      return fileSizeInMB <= MAX_IMAGE_SIZE_MB;
    }),
  }).required("გთხოვთ ატვირთოთ თქვენი ფოტო!"),
  email: Yup.string().test(
      "is-valid-email",
      "Invalid email address",
      function (value) {
        if (!value) {
          return true;
        }
        return Yup.string()
          .email()
          .matches(/@redberry\.ge$/, "მეილი უნდა მთავრდებოდეს @redberry.ge-ით")
          .isValidSync(value);
      }
    ),
  description: Yup.string().min(4, 'მინიმუმ 4 სიმბოლო').required('მინიმუმ 4 სიმბოლო'),
  publish_date: Yup.string().required(),
});
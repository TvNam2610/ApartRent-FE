import { Helmet } from 'react-helmet';

// eslint-disable-next-line react/prop-types
const SeoHelmet = ({ title, description, image }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
};
export default SeoHelmet;

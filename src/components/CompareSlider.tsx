import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export const CompareSlider = ({
  original,
  restored,
}: {
  original: string;
  restored: string;
}) => {
  return (
    <ReactCompareSlider
      itemOne={<ReactCompareSliderImage src={restored} alt="generated photo" />}
      itemTwo={<ReactCompareSliderImage src={original} alt="original photo" />}
      portrait={false}
      style={{ width: "100%", borderRadius: 8 }}
    />
  );
};

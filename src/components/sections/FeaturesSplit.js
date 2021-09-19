import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import splitImage03 from './../../assets/images/features-split-image-03.png';
import './../../assets/css/style.css'
import 'react-slideshow-image/dist/styles.css'
import { Zoom, Slide } from 'react-slideshow-image';
import {SuaMay, HoTro} from './events/ImagesData'


const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}


const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'Các sự kiện đã tổ chức',
  };

  const properties = {
    duration: 5000,
    autoplay: true,
    transitionDuration: 500,
    arrows: true,
    infinite: true,
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div>
                <h3 className="mt-0 mb-12">
                  Sự kiện sửa máy hàng năm
                  </h3>
                <p className="m-0">
                Là hoạt động vô cùng quan trọng, được SIC tổ chức diễn ra hàng năm sửa chữa máy tính miễn phí cho sinh viên- cán bộ giáo viên bao gồm các hoạt động thiết thực như:
                Hỗ trợ vệ sinh và nâng cấp máy tính.
                Tư vấn máy tính miễn phí.
                Cài đặt windows, phần mềm,...
                  </p>
              </div> 
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                {/* <Image
                  src={splitImage01}
                  alt="Features split 01"
                  width={528}
                  height={396} /> */}
                <div className="slide-container">
                  <Slide {...properties}>
                    {SuaMay.map((each, index) => (
                      <div key={index} className="each-slide" > 
                        <img className="lazy" src={each} alt="sample" />
                      </div>
                    ))}
                  </Slide>
                </div>
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div>
                <h3 className="mt-0 mb-12">
                  Hỗ trợ tân sinh viên nhập học
                </h3>
                <p className="m-0">
                  Luôn đồng hành cũng các bạn tân sinh viên, sát cánh ngay những" bước đầu tiên". CLB Tin Học Sinh Viên hỗ trợ tân sinh viên trong việc khai báo hồ sơ, hoàn tất thủ tục nhập học bằng mọi hình thức dù xa hay gần chỉ với những click chuột. Bên cạnh đó, các kênh hỗ trợ online, tổng đài liên hệ luôn sẵn sàng để giải đáp thắc mặc cho tân sinh viên và phụ huynh.
                </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                {/* <Image
                  src={splitImage02}
                  alt="Features split 02"
                  width={528}
                  height={396} /> */}
                <div className="slide-container-left">
                  <Zoom {...properties}>
                    {HoTro.map((each, index) => (
                      <div key={index} className="each-slide" > 
                        <img className="lazy" src={each} alt="sample" />
                      </div>
                    ))}
                  </Zoom>
                </div>
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div>
                <h3 className="mt-0 mb-12">
                  Data-driven insights
                  </h3>
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={splitImage03}
                  alt="Features split 03"
                  width={528}
                  height={396} />
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Lightning fast workflow
                  </div>
                <h3 className="mt-0 mb-12">
                  Hỗ trợ tân sinh viên nhập học
                </h3>
                <p className="m-0">
                  Luôn đồng hành cũng các bạn tân sinh viên, sát cánh ngay những" bước đầu tiên". CLB Tin Học Sinh Viên hỗ trợ tân sinh viên trong việc khai báo hồ sơ, hoàn tất thủ tục nhập học bằng mọi hình thức dù xa hay gần chỉ với những click chuột. Bên cạnh đó, các kênh hỗ trợ online, tổng đài liên hệ luôn sẵn sàng để giải đáp thắc mặc cho tân sinh viên và phụ huynh.
                </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                {/* <Image
                  src={splitImage02}
                  alt="Features split 02"
                  width={528}
                  height={396} /> */}
                <div className="slide-container-left">
                  <Zoom {...properties}>
                    {HoTro.map((each, index) => (
                      <div key={index} className="each-slide" > 
                        <img className="lazy" src={each} alt="sample" />
                      </div>
                    ))}
                  </Zoom>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
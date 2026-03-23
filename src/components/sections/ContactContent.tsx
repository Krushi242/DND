import React, { useState } from 'react';
import { ChevronDown, Clock } from 'lucide-react';
import Container from '../common/Container';
import locationIcon from '../../assets/images/location.svg';
import callIcon from '../../assets/images/call.svg';
import emailIcon from '../../assets/images/email.svg';
import btnIcon from '../../assets/images/apme_symbol-white.svg';
import SchedualIcon from '../../assets/images/schedual.svg';


const ContactContent: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    city: '',
    inquiryType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: '', phone: '', email: '', company: '', city: '', inquiryType: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const inputClass = "w-full bg-white rounded-[6px] px-[22px] py-[18px] text-[14px] leading-[120%] tracking-[0.011em] text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#005948] peer";
  const labelClass = "absolute left-[22px] top-1/2 -translate-y-1/2 text-[#6C6C6C] text-[14px] leading-[120%] tracking-[0.011em] pointer-events-none opacity-0 peer-placeholder-shown:opacity-100 transition-opacity";
  const textareaLabelClass = "absolute left-[22px] top-[18px] text-[#6C6C6C] text-[14px] leading-[120%] tracking-[0.011em] pointer-events-none opacity-0 peer-placeholder-shown:opacity-100 transition-opacity";

  return (
    <section className="py-[60px] md:py-[100px]" id="contact-form">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col lg:col-span-1 pt-[4px]">
            <h3 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2] mb-4">
              Our Contact Details
            </h3>
            <p className="text-[#4A4A4A] text-[16px] md:text-[18px] mb-[56px]">
              We ensure transparent and accessible communication for all business and farming inquiries.
            </p>

            <div className="flex flex-col gap-[30px]">
              <div className="flex items-start gap-[18px]">
                <div className="w-[30px] h-[30px] lg:w-[52px] lg:h-[52px] rounded-[6px] bg-[#F26A21] flex items-center justify-center shrink-0 mt-[2px]">
                  <img src={locationIcon} alt="location icon" className="w-[24px] h-[24px]" />
                </div>
                <div>
                  <p className="text-[#333333] text-[14px] font-medium mb-[6px]">Registered Office Address</p>
                  <p className="text-[#1F1F1F] font-semibold text-[18px] mb-[2px]">DRD Plantech LLP</p>
                  <p className="text-[#1F1F1F] text-[18px] max-w-[400px]">
                    A/55, Fortune North Industrial Park, B/H Gamthi Hotel, Nana Chiloda Circle, Near Naroda GIDC, Ahmedabad - 382330, Gujarat, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-[18px]">
                <div className="w-[30px] h-[30px] lg:w-[52px] lg:h-[52px] rounded-[6px] bg-[#F26A21] flex items-center justify-center shrink-0 mt-[2px]">
                  <img src={callIcon} alt="call icon" className="w-[24px] h-[24px]" />
                </div>
                <div>
                  <p className="text-[#333333] text-[14px] font-medium mb-[6px]">Phone and WhatsApp</p>
                  <p className="text-[#1F1F1F] font-semibold text-[18px]">+91 79841 09698</p>
                </div>
              </div>

              <div className="flex items-start gap-[18px]">
                <div className="w-[30px] h-[30px] lg:w-[52px] lg:h-[52px] rounded-[6px] bg-[#F26A21] flex items-center justify-center shrink-0 mt-[2px]">
                  <img src={emailIcon} alt="email icon" className="w-[24px] h-[24px]" />
                </div>
                <div>
                  <p className="text-[#333333] text-[14px] font-medium mb-[6px]">Email Us</p>
                  <p className="text-[#1F1F1F] font-semibold text-[18px]">info@drdplantech.com</p>
                </div>
              </div>

              <div className="flex items-start gap-[18px]">
                <div className="w-[30px] h-[30px] lg:w-[52px] lg:h-[52px] rounded-[6px] bg-[#F26A21] flex items-center justify-center shrink-0 mt-[2px] text-white">
                  <img src={SchedualIcon} alt="schedule icon" className="w-[24px] h-[24px]" />
                </div>
                <div>
                  <p className="text-[#333333] text-[14px] font-medium mb-[6px]">Business Hours</p>
                  <p className="text-[#1F1F1F] font-semibold text-[18px]">Monday - Saturday</p>
                  <p className="text-[#1F1F1F] font-semibold text-[18px]">9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F2F4F0] p-[20px] lg:p-[30px] rounded-[10px] h-fit max-w-[560px] lg:ml-auto w-full">
            <h3 className="text-[#1F1F1F] text-[16px] md:text-[22px] font-medium mb-[16px]">
              Send Us a Message
            </h3>
            <p className="text-[#333333] text-[14px] md:text-[16px] mb-[40px]">
              Have a question about hybrid vegetable seeds, crop selection, or dealership? Fill out the inquiry form below and our team will respond promptly.
            </p>

            {submitSuccess ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-[#005948]/10 text-[#005948] rounded-full flex items-center justify-center text-3xl">✓</div>
                <h4 className="text-2xl font-medium text-[#1F1F1F]">Message Sent Successfully!</h4>
                <p className="text-[#6C6C6C]">Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                  <div className="relative">
                    <input required type="text" name="name" value={formState.name} onChange={handleChange} placeholder=" " className={inputClass} />
                    <label className={labelClass}>Full Name <span className="text-[#F26A21]">*</span></label>
                  </div>
                  <div className="relative">
                    <input required type="tel" name="phone" value={formState.phone} onChange={handleChange} placeholder=" " className={inputClass} />
                    <label className={labelClass}>Phone Number <span className="text-[#F26A21]">*</span></label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                  <div className="relative">
                    <input required type="email" name="email" value={formState.email} onChange={handleChange} placeholder=" " className={inputClass} />
                    <label className={labelClass}>Email Address <span className="text-[#F26A21]">*</span></label>
                  </div>
                  <div className="relative">
                    <input required type="text" name="company" value={formState.company} onChange={handleChange} placeholder=" " className={inputClass} />
                    <label className={labelClass}>Company Name <span className="text-[#F26A21]">*</span></label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                  <div className="relative">
                    <input required type="text" name="city" value={formState.city} onChange={handleChange} placeholder=" " className={inputClass} />
                    <label className={labelClass}>City/Location <span className="text-[#F26A21]">*</span></label>
                  </div>
                  <div className="relative">
                    <select required name="inquiryType" value={formState.inquiryType} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                      <option value="" disabled hidden></option>
                      <option value="sales">Sales & Dealership</option>
                      <option value="product">Product Information</option>
                      <option value="support">Agronomy Support</option>
                      <option value="other">Other</option>
                    </select>
                    {!formState.inquiryType && (
                      <label className="absolute left-[22px] top-1/2 -translate-y-1/2 text-[#6C6C6C] text-[14px] leading-[120%] tracking-[0.011em] pointer-events-none">
                        Inquiry Type <span className="text-[#F26A21]">*</span>
                      </label>
                    )}
                    <div className="absolute right-[22px] top-1/2 -translate-y-1/2 pointer-events-none text-[#6C6C6C]">
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>

                <div className="relative mb-[14px]">
                  <textarea required name="message" value={formState.message} onChange={handleChange} rows={4} placeholder=" " className={`${inputClass} resize-none min-h-[72px]`} />
                  <label className={textareaLabelClass}>Message <span className="text-[#F26A21]">*</span></label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="self-start flex items-center gap-[8px] md:gap-[10px] px-[14px] py-[12px] md:px-[18px] md:py-[17px] rounded-[5px] bg-[#005948] hover:bg-[#004a3b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-white text-[14px] md:text-[16px] font-semibold leading-[120%] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {isSubmitting ? 'Sending...' : 'Get in Touch Today'}
                  {!isSubmitting && <img src={btnIcon} alt="icon" className="w-[18px] h-[18px]" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactContent;

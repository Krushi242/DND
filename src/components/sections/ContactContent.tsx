import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from '../common/Container';
import locationIcon from '../../assets/images/location.svg';
import callIcon from '../../assets/images/call.svg';
import emailIcon from '../../assets/images/email.svg';
import SchedualIcon from '../../assets/images/schedual.svg';
import ad1 from '../../assets/images/ad1.svg';
import ad2 from '../../assets/images/ad2.svg';
import ad3 from '../../assets/images/ad3.svg';
import btnIcon2 from '../../assets/images/symbol 1.svg';



const ContactContent: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    city: '',
    inquiry_type: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!formState.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formState.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // City validation
    if (!formState.city.trim()) {
      newErrors.city = 'City/Location is required';
    }

    // Name validation
    if (!formState.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    // Message validation
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      console.log('Success:', data);
      
      setSubmitSuccess(true);
      setFormState({ name: '', phone: '', email: '', company: '', city: '', inquiry_type: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const inputClass = "w-full bg-[#FAF9F6] rounded-[6px] px-[22px] py-[18px] text-[14px] leading-[120%] tracking-[0.011em] text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#005948] peer";
  const labelClass = "absolute left-[22px] top-1/2 -translate-y-1/2 text-[#6C6C6C] text-[14px] leading-[120%] tracking-[0.011em] pointer-events-none opacity-0 peer-placeholder-shown:opacity-100 transition-opacity";
  const textareaLabelClass = "absolute left-[22px] top-[18px] text-[#6C6C6C] text-[14px] leading-[120%] tracking-[0.011em] pointer-events-none opacity-0 peer-placeholder-shown:opacity-100 transition-opacity";

  return (
    <>
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
                  <a href="tel:+917984109698" className="text-[#1F1F1F] font-semibold text-[18px] hover:text-[#F26A21] transition-colors">+91 79841 09698</a>
                </div>
              </div>

              <div className="flex items-start gap-[18px]">
                <div className="w-[30px] h-[30px] lg:w-[52px] lg:h-[52px] rounded-[6px] bg-[#F26A21] flex items-center justify-center shrink-0 mt-[2px]">
                  <img src={emailIcon} alt="email icon" className="w-[24px] h-[24px]" />
                </div>
                <div>
                  <p className="text-[#333333] text-[14px] font-medium mb-[6px]">Email Us</p>
                  <a href="mailto:info@drdplantech.com" className="text-[#1F1F1F] font-semibold text-[18px] hover:text-[#F26A21] transition-colors">info@drdplantech.com</a>
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
            <h3 className="text-[#1F1F1F] text-[22px] font-medium mb-[16px]">
              Send Us a Message
            </h3>
            <p className="text-[#333333] text-[16px] mb-[40px]">
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
                    <input required type="text" name="name" value={formState.name} onChange={handleChange} placeholder=" " className={`${inputClass} ${errors.name ? 'ring-1 ring-red-500' : ''}`} />
                    <label className={labelClass}>Full Name <span className="text-[#F26A21]">*</span></label>
                    {errors.name && <span className="text-red-500 text-[11px] mt-1 ml-1">{errors.name}</span>}
                  </div>
                  <div className="relative">
                    <input required type="tel" name="phone" value={formState.phone} onChange={handleChange} placeholder=" " className={`${inputClass} ${errors.phone ? 'ring-1 ring-red-500' : ''}`} />
                    <label className={labelClass}>Phone Number <span className="text-[#F26A21]">*</span></label>
                    {errors.phone && <span className="text-red-500 text-[11px] mt-1 ml-1">{errors.phone}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                  <div className="relative">
                    <input required type="email" name="email" value={formState.email} onChange={handleChange} placeholder=" " className={`${inputClass} ${errors.email ? 'ring-1 ring-red-500' : ''}`} />
                    <label className={labelClass}>Email Address <span className="text-[#F26A21]">*</span></label>
                    {errors.email && <span className="text-red-500 text-[11px] mt-1 ml-1">{errors.email}</span>}
                  </div>
                  <div className="relative">
                    <input required type="text" name="company" value={formState.company} onChange={handleChange} placeholder=" " className={inputClass} />
                    <label className={labelClass}>Company Name <span className="text-[#F26A21]">*</span></label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                  <div className="relative">
                    <input required type="text" name="city" value={formState.city} onChange={handleChange} placeholder=" " className={`${inputClass} ${errors.city ? 'ring-1 ring-red-500' : ''}`} />
                    <label className={labelClass}>City/Location <span className="text-[#F26A21]">*</span></label>
                    {errors.city && <span className="text-red-500 text-[11px] mt-1 ml-1">{errors.city}</span>}
                  </div>
                  <div className="relative">
                    <select required name="inquiry_type" value={formState.inquiry_type} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                      <option value="" disabled hidden></option>
                      <option value="sales">Sales & Dealership</option>
                      <option value="product">Product Information</option>
                      <option value="support">Agronomy Support</option>
                      <option value="other">Other</option>
                    </select>
                    {!formState.inquiry_type && (
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
                  <textarea required name="message" value={formState.message} onChange={handleChange} rows={4} placeholder=" " className={`${inputClass} resize-none min-h-[72px] ${errors.message ? 'ring-1 ring-red-500' : ''}`} />
                  <label className={textareaLabelClass}>Message <span className="text-[#F26A21]">*</span></label>
                  {errors.message && <span className="text-red-500 text-[11px] mt-1 ml-1">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="self-start flex items-center gap-[8px] md:gap-[10px] px-[14px] py-[12px] md:px-[18px] md:py-[17px] rounded-[5px] bg-[#005948] hover:bg-[#004a3b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-white text-[14px] md:text-[16px] font-semibold leading-[120%] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {isSubmitting ? 'Sending...' : 'Get in Touch Today'}
                  {!isSubmitting && <img src={btnIcon2} alt="icon" className="w-[18px] h-[18px]" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>

    {/* Crop Advisory Section */}
    <section className="py-[50px] md:py-[80px] mx-[16px] lg:mx-[20px] bg-[#F2F4F0]">
      <Container>
        <div className="text-center max-w-[800px] mx-auto mb-[40px] md:mb-[60px]">
          <h2 className="text-[#1F1F1F] text-[28px] md:text-[42px] font-medium mb-5">
            Crop Advisory and Technical Assistance
          </h2>
          <p className="text-[#333333] text-[16px]">
            Our team provides guidance to help you select the right hybrid and improve crop performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[40px] md:mb-[60px]">
          {/* Card 1 */}
          <div className="bg-[#FAF9F6] p-[20px] md:p-[24px] rounded-[10px] border border-black/5 flex flex-col items-center text-center">
            <div className="w-[60px] h-[60px] flex items-center justify-center mb-5">
              <img src={ad1} alt="Product Selection" className="w-full h-full object-contain" />
            </div>
            <h4 className="text-[#1F1F1F] text-[20px] md:text-[22px] font-medium mb-3">
              Product<br />Selection Guidance
            </h4>
            <p className="text-[#333333] text-[14px] md:text-[16px] leading-[1.1]">
              Assistance in choosing hybrids suitable for your region and season.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FAF9F6] p-[20px] md:p-[24px] rounded-[10px] border border-black/5 flex flex-col items-center text-center">
            <div className="w-[60px] h-[60px] flex items-center justify-center mb-5">
              <img src={ad2} alt="Seasonal Planning" className="w-full h-full object-contain" />
            </div>
            <h4 className="text-[#1F1F1F] text-[20px] md:text-[22px] font-medium mb-3">
              Seasonal Crop<br />Planning Support
            </h4>
            <p className="text-[#333333] text-[14px] md:text-[16px] leading-[1.1]">
              Recommendations for sowing cycles and hybrid suitability.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FAF9F6] p-[20px] md:p-[24px] rounded-[10px] border border-black/5 flex flex-col items-center text-center">
            <div className="w-[60px] h-[60px] flex items-center justify-center mb-5">
              <img src={ad3} alt="Disease Management" className="w-full h-full object-contain" />
            </div>
            <h4 className="text-[#1F1F1F] text-[20px] md:text-[24px] font-medium mb-3">
              Disease Management<br />Consultation
            </h4>
            <p className="text-[#333333] text-[14px] md:text-[16px] leading-[1.1]">
              Support for selecting disease-tolerant hybrids and crop protection strategies.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-[8px] md:gap-[10px] px-[18px] py-[14px] md:px-[24px] md:py-[18px] rounded-[5px] bg-[#005948] hover:bg-[#004a3b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-white text-[14px] md:text-[16px] font-semibold leading-[120%]"
          >
            Talk to Our Expert
            <img src={btnIcon2} alt="icon" className="w-[18px] h-[18px]" />
          </button>
        </div>
      </Container>
      </section>
    </>
  );
};

export default ContactContent;

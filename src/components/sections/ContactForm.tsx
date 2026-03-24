import React, { useState } from 'react';
import Container from '../common/Container';
import icon from '../../assets/images/apme_symbol-green.svg';
import btnIcon from '../../assets/images/symbol 1.svg';
import { ChevronDown } from 'lucide-react';
import locationIcon from '../../assets/images/location.svg';
import callIcon from '../../assets/images/call.svg';
import emailIcon from '../../assets/images/email.svg';

const ContactForm: React.FC = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
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
      setFormState({ name: '', phone: '', email: '', company: '', city: '', inquiryType: '', message: '' });
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

  // Input styles
  const inputClass = "w-full bg-[#F2F4F0] rounded-[6px] px-[20px] py-[16px] text-[14px] text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#005948] peer";
  const labelClass = "absolute left-[20px] top-[18px] text-[#6C6C6C] text-[14px] pointer-events-none opacity-0 peer-placeholder-shown:opacity-100 transition-opacity";

  return (
    <section id="contact" className="bg-[#F2F4F0] mx-[16px] lg:mx-[20px]  rounded-[10px] py-[20px] md:py-[80px] overflow-hidden mb-[100px]">
      <Container>
        <div>
          
          {/* Header */}
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="flex items-center gap-2 mb-4">
              <img src={icon} alt="icon" className="w-[16px] h-[16px]" />
              <p className="text-[#005948] text-[16px] font-regular">Get in touch</p>
            </div>
            <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2] mb-6">
              Contact Us
            </h2>
            <p className="text-[#333333] text-[18px]">
              Do you have questions about varieties or dealership opportunities? Our team is ready to assist.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white px-[20px] py-[30px] md:p-10 rounded-[10px] shadow-sm mb-12 w-full mx-auto">
            {submitSuccess ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-[#005948]/10 text-[#005948] rounded-full flex items-center justify-center text-3xl">✓</div>
                <h3 className="text-2xl font-medium text-[#1F1F1F]">Message Sent Successfully!</h3>
                <p className="text-[#6C6C6C]">Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                  
                  {/* Full Name */}
                  <div className="relative">
                    <input required type="text" name="name" value={formState.name} onChange={handleChange} placeholder=" " className={inputClass} />
                    <label className={labelClass}>
                      Full Name <span className="text-[#F26A21]">*</span>
                    </label>
                  </div>
                  
                  {/* Phone Number */}
                  <div className="relative">
                    <input required type="tel" name="phone" value={formState.phone} onChange={handleChange} placeholder=" " className={inputClass} />
                    <label className={labelClass}>
                      Phone Number <span className="text-[#F26A21]">*</span>
                    </label>
                  </div>
                  
                  {/* Email Address */}
                  <div className="relative">
                    <input required type="email" name="email" value={formState.email} onChange={handleChange} placeholder=" " className={inputClass} />
                    <label className={labelClass}>
                      Email Address <span className="text-[#F26A21]">*</span>
                    </label>
                  </div>
                  
                  {/* Company Name */}
                  <div className="relative">
                    <input required type="text" name="company" value={formState.company} onChange={handleChange} placeholder=" " className={inputClass} />
                    <label className={labelClass}>
                      Company Name <span className="text-[#F26A21]">*</span>
                    </label>
                  </div>
                  
                  {/* City/Location */}
                  <div className="relative">
                    <input required type="text" name="city" value={formState.city} onChange={handleChange} placeholder=" " className={inputClass} />
                    <label className={labelClass}>
                      City/Location <span className="text-[#F26A21]">*</span>
                    </label>
                  </div>
                  
                  {/* Inquiry Type */}
                  <div className="relative">
                    <select required name="inquiryType" value={formState.inquiryType} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`} >
                      <option value="" disabled hidden></option>
                      <option value="sales">Sales & Dealership</option>
                      <option value="product">Product Information</option>
                      <option value="support">Agronomy Support</option>
                      <option value="other">Other</option>
                    </select>
                    {!formState.inquiryType && (
                      <label className="absolute left-[20px] top-[18px] text-[#8C8C8C] text-[14px] pointer-events-none">
                        Inquiry Type <span className="text-[#F26A21]">*</span>
                      </label>
                    )}
                    <div className="absolute right-[20px] top-1/2 -translate-y-1/2 pointer-events-none text-[#6C6C6C]">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="relative mb-12">
                  <textarea required name="message" value={formState.message} onChange={handleChange} rows={5} placeholder=" " className={`${inputClass} resize-none`} />
                  <label className={labelClass}>
                    Message <span className="text-[#F26A21]">*</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-[8px] md:gap-[10px] px-[16px] py-[12px] md:px-[24px] md:py-[16px] rounded-[5px] bg-[#005948] hover:bg-[#004235] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-white text-[14px] md:text-[15px] font-semibold disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none">
                  {isSubmitting ? 'Sending...' : 'Get in Touch Today'}
                  {!isSubmitting && <img src={btnIcon} alt="icon" className="w-[18px] h-[18px]" />}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mx-auto">

            {/* Visit Us */}
            <div className="bg-[#FAF9F6] p-[26px] rounded-[10px] flex items-center gap-[14px]">
              <div className="w-[52px] h-[52px] rounded-[10px] bg-[#F26A21] flex items-center justify-center shrink-0">
                <img src={locationIcon} className="w-[20px] h-[20px]" />
              </div>
              <div className="flex flex-col">
                <p className="text-[#333333] text-[14px] font-medium leading-[1.2]">
                  Visit Us
                </p>
                <h4 className="text-[#1F1F1F] font-semibold text-[18px] leading-[1.2] mt-[4px]">
                  DRD Plantech LLP
                </h4>
                <span className="text-[#4A4A4A] text-[18px] font-normal leading-[1.2] mt-[4px]">
                  Ahmedabad, Gujarat, India
                </span>
              </div>
            </div>

            {/* Call Us */}
            <div className="bg-[#FAF9F6] p-[26px] rounded-[10px] flex items-center gap-[14px]">
              <div className="w-[52px] h-[52px] rounded-[10px] bg-[#F26A21] flex items-center justify-center shrink-0">
                <img src={callIcon} className="w-[20px] h-[20px]" />
              </div>
              <div className="flex flex-col">
                <p className="text-[#333333] text-[14px] font-medium leading-[1.2]">
                  Call Us
                </p>
                <h4 className="text-[#1F1F1F] font-semibold text-[18px] leading-[1.2] mt-[4px]">
                  +91 79841 09698
                </h4>
              </div>
            </div>

            {/* Email Us */}
            <div className="bg-[#FAF9F6] p-[26px] rounded-[10px] flex items-center gap-[14px]">
              <div className="w-[52px] h-[52px] rounded-[10px] bg-[#F26A21] flex items-center justify-center shrink-0">
                <img src={emailIcon} className="w-[20px] h-[20px]" />
              </div>
              <div className="flex flex-col">
                <p className="text-[#333333] text-[14px] font-medium leading-[1.2]">
                  Email Us
                </p>
                <h4 className="text-[#1F1F1F] font-semibold text-[18px] leading-[1.2] mt-[4px]">
                  info@drdplantech.com
                </h4>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default ContactForm;

import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';


const Contact = () => {
    return (
        <div className=''>
            <section className="bg-gradient-to-r from-yellow-100 to-red-100 py-16" id="contact">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-10">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              We'd love to hear from you! Whether you have a question about our menu, reservations, or events, our team is here to help.
            </p>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-red-600 text-2xl" />
              <span>123 Bristo Street, Foodie City, FC 4567</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-red-600 text-2xl" />
              <span>+880 1234 567890</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-red-600 text-2xl" />
              <span>info@bristoboss.com</span>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-red-600 hover:text-red-800 text-2xl"><FaFacebook /></a>
              <a href="#" className="text-red-600 hover:text-red-800 text-2xl"><FaInstagram /></a>
              <a href="#" className="text-red-600 hover:text-red-800 text-2xl"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
        </div>
    );
};

export default Contact;
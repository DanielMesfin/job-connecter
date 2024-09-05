import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md my-8">
      <h1 className="text-2xl font-bold mb-4">Intelligent Job Connector (IJC) - Terms and Conditions</h1>

      <p className="mb-4">
        Welcome to Intelligent Job Connector (IJC). If you continue to use our services, you are agreeing to comply with
        and be bound by the following terms and conditions of use.
      </p>

      <h2 className="text-lg font-bold my-2">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing or using the Intelligent Job Connector website and services, you agree to and are bound by the
        terms and conditions outlined here.
      </p>

      <h2 className="text-lg font-bold my-2">2. User Responsibilities</h2>
      <p className="mb-4">
        Users of Intelligent Job Connector agree to use the platform only for lawful and legitimate purposes. Any misuse
        or violation of these terms may result in the termination of your account.
      </p>

      <h2 className="text-lg font-bold my-2">3. Job Listings</h2>
      <p className="mb-4">
        The job listings provided on Intelligent Job Connector are for informational purposes only. IJC does not
        guarantee the accuracy or completeness of the job information, and users are encouraged to verify details with
        employers directly.
      </p>

      {/* Add more sections as needed */}

      <h2 className="text-lg font-bold my-2">4. Changes to Terms</h2>
      <p className="mb-4">
        Intelligent Job Connector reserves the right to modify or replace any part of these terms and conditions at any
        time without notice. It is the user's responsibility to review these terms periodically for changes.
      </p>

      <p className="mt-8">
        If you have any questions or concerns about these terms and conditions, please{' '}
        <a href="mailto:info@ijc.com" className="text-blue-500">
          contact us
        </a>
        .
      </p>
    </div>
  );
};

export default TermsAndConditions;

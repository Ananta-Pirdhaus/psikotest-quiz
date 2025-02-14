import React from "react";

export default function GamingLibrary() {
  return (
    <section className="py-16 sc-join flex items-center justify-center bg-orange-600 relative after:absolute after:content-[''] after:bg-gradient-to-b after:from-black/50 after:to-black/50 after:bg-center after:bg-cover after:bg-no-repeat">
      <div className="container w-full text-white max-w-7xl">
        {/* Members List */}
        <div className="mb-6 text-center">
          <h3 className="join-title py-5">Members</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mx-auto">
            <div className="bg-light-gray p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-dashed border-2 border-gray-400">
              <div className="flex items-center mb-4">
                <i className="fas fa-user-plus text-orange-600 mr-3 text-2xl"></i>
                <h4 className="text-dark-gray font-semibold text-lg">
                  John Doe
                </h4>
              </div>
              <p className="text-dark-gray">
                Psychology enthusiast, loves exploring career opportunities.
              </p>
            </div>
            <div className="bg-light-gray p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-dashed border-2 border-gray-400">
              <div className="flex items-center mb-4">
                <i className="fas fa-user-plus text-orange-600 mr-3 text-2xl"></i>
                <h4 className="text-dark-gray font-semibold text-lg">
                  Jane Smith
                </h4>
              </div>
              <p className="text-dark-gray">
                Psychologist, passionate about helping people discover their
                careers.
              </p>
            </div>
            <div className="bg-light-gray p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-dashed border-2 border-gray-400">
              <div className="flex items-center mb-4">
                <i className="fas fa-user-plus text-orange-600 mr-3 text-2xl"></i>
                <h4 className="text-dark-gray font-semibold text-lg">
                  Michael Johnson
                </h4>
              </div>
              <p className="text-dark-gray">
                Career coach, dedicated to guiding others in their professional
                paths.
              </p>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="join-content text-center">
          <h2 className="join-title uppercase mb-4">
            join the <span>community</span>
          </h2>
          <p className="lead-text py-2">
            Join our Discord community which is in the making and made by gamers
            for gamers. All are welcome to join no matter the game you play,
            we're here to have a good time.
          </p>
          <button type="button" className="section-btn mt-4">
            join discord
          </button>
        </div>
      </div>
    </section>
  );
}

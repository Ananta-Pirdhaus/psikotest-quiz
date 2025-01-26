import React from "react";

const FeatureSection = () => {
<section className="py-16 sc-category">
  <div className="container">
    <div className="sc-title">
      <h3>
        game <span>category</span>
      </h3>
      <div className="line"></div>
    </div>

    <div className="button-group mx-auto filter-button-group flex items-center justify-center flex-wrap">
      <button data-filter="action">action</button>
      <button data-filter="shooter">shooter</button>
      <button data-filter="strategy">strategy</button>
      <button data-filter="arcade">arcade</button>
      <button data-filter="adventure">adventure</button>
    </div>

    <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="category-item img-fit-cover shadow-category-item overflow-hidden action shooter">
        <img src="../assets/images/action-1.jpg" alt="" />
        <div className="category-item-info">
          <div className="bg-green-normal text-white py-[2px] px-[6px] inline-block uppercase text-xs tracking-widest mb-[6px]">
            action
          </div>
          <h3 className="font-medium text-[18px] tracking-[.03em] uppercase text-white mb-2">
            Grand Theft Auto V
          </h3>
          <ul className="flex mb-[14px]">
            <li className="me-3">
              <img src="../assets/icons/dev-icon-1.svg" alt="" />
            </li>
            <li className="me-3">
              <img src="../assets/icons/dev-icon-2.svg" alt="" />
            </li>
            <li className="me-3">
              <img src="../assets/icons/dev-icon-3.svg" alt="" />
            </li>
            <li className="me-3">
              <img src="../assets/icons/dev-icon-4.svg" alt="" />
            </li>
            <li className="me-3">
              <img src="../assets/icons/dev-icon-5.svg" alt="" />
            </li>
          </ul>
        </div>
      </div>

      <div className="category-item img-fit-cover shadow-category-item overflow-hidden action adventure">
        <img src="../assets/images/action-2.jpg" alt="" />
        <div className="category-item-info">
          <div className="bg-green-normal text-white py-[2px] px-[6px] inline-block uppercase text-xs tracking-widest mb-[6px]">
            action
          </div>
          <h3 className="font-medium text-[18px] tracking-[.03em] uppercase text-white mb-2">
            The Witcher 3: Wild Hunt
          </h3>
          <ul className="flex mb-[14px]">
            <li className="me-3">
              <img src="../assets/icons/dev-icon-1.svg" alt="" />
            </li>
            <li className="me-3">
              <img src="../assets/icons/dev-icon-2.svg" alt="" />
            </li>
            <li className="me-3">
              <img src="../assets/icons/dev-icon-3.svg" alt="" />
            </li>
            <li className="me-3">
              <img src="../assets/icons/dev-icon-4.svg" alt="" />
            </li>
            <li className="me-3">
              <img src="../assets/icons/dev-icon-5.svg" alt="" />
            </li>
          </ul>
        </div>
      </div>

      <div className="category-item img-fit-cover shadow-category-item overflow-hidden action strategy adventure">
        <img src="../assets/images/action-3.jpg" alt="" />
        <div className="category-item-info">
          <div className="bg-green-normal text-white py-[2px] px-[6px] inline-block uppercase text-xs tracking-widest mb-[6px]">
            action
          </div>
          <h3 className="font-medium text-[18px] tracking-[.03em] uppercase text-white mb-2">
            Tomb Raider (2013)
          </h3>
          <ul className="flex mb-[14px]">
            <li className="me-3">
              <img src="../assets/icons/dev-icon-1.svg" alt="" />
            </li>
            <li className="me-3">
              <img src="../assets/icons/dev-icon-2.svg" alt="" />
            </li>
            <li className="me-3">
              <img src="../assets/icons/dev-icon-3.svg" alt="" />
            </li>
            <li className="me-3">
              <img src="../assets/icons/dev-icon-4.svg" alt="" />
            </li>
            <li className="me-3">
              <img src="../assets/icons/dev-icon-5.svg" alt="" />
            </li>
          </ul>
        </div>
      </div>

      {/* Add similar blocks here for the rest of the games, replacing image sources and texts as needed */}
    </div>
  </div>
</section>;

};

export default FeatureSection;

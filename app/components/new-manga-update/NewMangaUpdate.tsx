import React from 'react';
import './NewMangaUpdate.css';
import Image from 'next/image';
import MangaCover from '../../images/demo-manga-covers/2b.jpg';

const NewMangaUpdate: React.FC = () => {
  const renderMangaDivs = () => {
    const mangaDivs = [];
    for (let i = 0; i < 10; i++) {
      mangaDivs.push(
        <div className="manga" key={i}>
          <Image src={MangaCover} alt={''} className="manga-cover" />
          <div className="manga-info">
            <p className="name">Nier: Automata Ver1.1a</p>
            <p className="chapter">Chapter 6996</p>
          </div>
        </div>
      );
    }
    return mangaDivs;
  };

  return (
    <div className="new-manga-update">
      <div className="heading-and-subheading">
        <p className="heading">Truyện mới cập nhật</p>
        <p className="subheading">NetTruyen</p>
      </div>
      <div className="manga-wrapper">
        {renderMangaDivs()}
      </div>
    </div>
  );
};

export default NewMangaUpdate;

declare namespace interfaces {
  interface EachTag {
    [key: string]: string;
  }
  interface UserTag {
    like: EachTag;
    disLike: EachTag;
  }
  interface AuthData {
    provider: string;
    username: string;
    socialId: string;
    profileImg: string;
  }

  interface SelectMovie {
    [key: string]: string;
  }

  interface SearchCount {
    [key: string]: number;
  }

  interface SingleMovie {
    title: string;
    titleEng: string;
    date: string;
    director: string;
    actor: string;
    plotKr: string;
    plotEng?: string;
    runtime: number;
    genre: string;
    image: string;
    tag: string;
  }

  interface MOVIE {
    id: number;
    docid: string;
    title: string;
    titleEng: string;
    director: string;
    actor: string[];
    plotKr: string;
    plotEng: string;
    runtime: number;
    genre: string;
    image: {
      posters: string;
      stlls: string;
    };
    tag: number[];
    date: string;
    score: number;
  }
}

export = interfaces;

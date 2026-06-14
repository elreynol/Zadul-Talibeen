const hadiths = [
  {
    "arabic": "الدِّينُ النَّصِيحَةُ",
    "english": "The religion is to act with sincerity.",
    "source": "Sahih Muslim"
  },
  {
    "arabic": "الدُّعَاءُ مُخُّ الْعِبَادَةِ",
    "english": "Supplication is the essence of worship.",
    "source": "Sahih al-Bukhari"
  },
  {
    "arabic": "الْمَرْءُ مَعَ مَنْ أَحَبَّ",
    "english": "A person will be with whom he loves.",
    "source": "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    "arabic": "الأَنَاةُ مِنَ اللَّهِ وَالْعَجَلَةُ مِنَ الشَّيْطَانِ",
    "english": "Calmness and patient deliberation is from Allah and haste is from Satan.",
    "source": "Jamiʿ al-Tirmidhi"
  },
  {
    "arabic": "الْمَجَالِسُ بِالْأَمَانَةِ",
    "english": "Gatherings are to be kept in confidence.",
    "source": "Sunan Abi Dawud"
  },
  {
    "arabic": "الْحَيَاءُ شُعْبَةٌ مِنَ الْإِيمَانِ",
    "english": "Modesty is a branch of faith.",
    "source": "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    "arabic": "الْخَمْرُ جَامِعَةُ الْإِثْمِ",
    "english": "Alcohol constitutes many sins.",
    "source": "Razin"
  },
  {
    "arabic": "الْمُؤْمِنُ غَرِيٌّ كَرِيمٌ وَالْفَاجِرُ خَبٌّ لَئِيمٌ",
    "english": "A believer is simple and noble and a transgressor is deceitful and ignoble.",
    "source": "Sunan Abi Dawud & Jamiʿ al-Tirmidhi"
  },
  {
    "arabic": "الظُّلْمُ ظُلُمَاتٌ يَوْمَ الْقِيَامَةِ",
    "english": "Oppression will be darknesses on the Day of Judgment.",
    "source": "Sahih al-Bukhari"
  },
  {
    "arabic": "الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ",
    "english": "The world is a prison for the believer and a paradise for the unbeliever.",
    "source": "Sahih Muslim & Jamiʿ al-Tirmidhi"
  },
  {
    "arabic": "الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى",
    "english": "The upper [giving] hand is superior to the lower [taking] hand.",
    "source": "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    "arabic": "الطُّهُورُ شَطْرُ الْإِيمَانِ",
    "english": "Purity is half of faith.",
    "source": "Sahih Muslim"
  },
  {
    "arabic": "الْجَرَسُ مَزَامِيرُ الشَّيْطَانِ",
    "english": "Bells are the flutes of Satan.",
    "source": "Sahih Muslim"
  },
  {
    "arabic": "الْآكِلُ الشَّاكِرُ كَالصَّائِمِ الصَّابِرِ",
    "english": "The one who eats and is thankful is like the one who fasts and is patient.",
    "source": "Jamiʿ al-Tirmidhi & Sunan al-Darimi"
  },
  {
    "arabic": "الْبَادِئُ بِالسَّلَامِ بَرِيءٌ مِنَ الْكِبْرِ",
    "english": "The one who initiates the salām is free of pride.",
    "source": "al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "السِّوَاكُ مَطْهَرَةٌ لِلْفَمِ مَرْضَاةٌ لِلرَّبِّ",
    "english": "The tooth-stick purifies the mouth and pleases the Lord.",
    "source": "Sahih al-Bukhari (ta'liqan), Sunan al-Nasa'i & Sunan al-Darimi"
  },
  {
    "arabic": "الْغِيبَةُ أَشَدُّ مِنَ الزِّنَا",
    "english": "Backbiting is worse than unlawful intercourse.",
    "source": "al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "الْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ",
    "english": "The Qur'an will either be evidence for you or against you.",
    "source": "Sahih Muslim"
  },
  {
    "arabic": "النِّسَاءُ حِبَالُ الشَّيْطَانِ",
    "english": "Women are the snares of Satan.",
    "source": "Razin"
  },
  {
    "arabic": "التَّائِبُ مِنَ الذَّنْبِ كَمَنْ لَا ذَنْبَ لَهُ",
    "english": "One who repents from sin is like one who has no sin.",
    "source": "Sunan Ibn Majah, al-Tabarani & al-Mu'jam al-Kabir"
  },
  {
    "arabic": "الْقَصْدُ فِي النَّفَقَةِ نِصْفُ الْمَعِيشَةِ، وَالتَّوَدُّدُ إِلَى النَّاسِ نِصْفُ الْعَقْلِ، وَحُسْنُ السُّؤَالِ نِصْفُ الْعِلْمِ",
    "english": "Moderation in spending is half of [one's] sustenance, friendliness toward people is half of [one's] intelligence, and asking good questions is half of [one's] knowledge.",
    "source": "al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "الْكَيِّسُ مَنْ دَانَ نَفْسَهُ وَعَمِلَ لِمَا بَعْدَ الْمَوْتِ، وَالْعَاجِزُ مَنْ أَتْبَعَ نَفْسَهُ هَوَاهَا وَتَمَنَّى عَلَى اللَّهِ",
    "english": "The intelligent one is he who has subdued his lower self and who has worked for what comes after death, and the stupid one is he who has put his lower self in pursuance of its desires and who has vain hopes about Allah.",
    "source": "Jamiʿ al-Tirmidhi & Sunan Ibn Majah"
  },
  {
    "arabic": "الْمُؤْمِنُ مُؤَالِفٌ وَلَا خَيْرَ فِيمَنْ لَا يُؤْلَفُ وَلَا يُؤَالِفُ",
    "english": "The believer is one who is sociable [with others], and there is no good in one who is not sociable [with others] nor in one who is not met sociably [by them].",
    "source": "al-Mustadrak, al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "الْغِنَاءُ يَنْبُتُ النِّفَاقَ فِي الْقَلْبِ كَمَا يَنْبُتُ الْمَاءُ الزَّرْعَ",
    "english": "Songs make hypocrisy grow in the heart just as water makes crops grow.",
    "source": "al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "التُّجَّارُ يُحْشَرُونَ يَوْمَ الْقِيَامَةِ فُجَّارًا إِلَّا مَنْ اتَّقَى اللَّهَ وَبَرَّ وَصَدَقَ",
    "english": "Traders will be gathered on the Day of Judgment as transgressors, except those who feared Allah, were righteous [in their oaths], and spoke the truth.",
    "source": "Jamiʿ al-Tirmidhi, Sunan Ibn Majah & Sunan al-Darimi"
  },
  {
    "arabic": "التَّاجِرُ الصَّدُوقُ الْأَمِينُ مَعَ النَّبِيِّينَ وَالصِّدِّيقِينَ وَالشُّهَدَاءِ",
    "english": "A truthful and trustworthy trader will be in the company of the prophets, the very truthful, and the martyrs.",
    "source": "Jamiʿ al-Tirmidhi, Sunan al-Darimi & al-Daraqutni"
  },
  {
    "arabic": "آيَةُ الْمُنَافِقِ ثَلَاثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اُؤْتُمِنَ خَانَ",
    "english": "The signs of a hypocrite are three: when he speaks he lies, when he makes a promise he breaks it, and when he is trusted he betrays the trust.",
    "source": "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    "arabic": "الْكَبَائِرُ: الْإِشْرَاكُ بِاللَّهِ، وَعُقُوقُ الْوَالِدَيْنِ، وَقَتْلُ النَّفْسِ، وَالْيَمِينُ الْغَمُوسُ",
    "english": "The major sins are worshipping others besides Allah, disobeying parents, killing a human being [unlawfully], and the immersing oath.",
    "source": "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    "arabic": "الْبِرُّ حُسْنُ الْخُلُقِ، وَالْإِثْمُ مَا حَاكَ فِي صَدْرِكَ، وَكَرِهْتَ أَنْ يَطَّلِعَ عَلَيْهِ النَّاسُ",
    "english": "Righteousness is good character, and sin is what causes uneasiness in your heart and what you dislike others to become aware of.",
    "source": "Sahih Muslim & Jamiʿ al-Tirmidhi"
  },
  {
    "arabic": "الْخَلْقُ عِيَالُ اللَّهِ فَأَحَبُّ الْخَلْقِ إِلَى اللَّهِ مَنْ أَحْسَنَ إِلَى عِيَالِهِ",
    "english": "All created beings are Allah's dependants, and the most beloved of creation to Allah is the one who is good to His dependants.",
    "source": "al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    "english": "A [true] Muslim is he from whose tongue and hand other believers remain safe.",
    "source": "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    "arabic": "وَالْمُؤْمِنُ مَنْ أَمِنَهُ النَّاسُ عَلَى دِمَائِهِمْ وَأَمْوَالِهِمْ",
    "english": "And a [true] believer is he whom people trust with their lives and possessions.",
    "source": "Jamiʿ al-Tirmidhi"
  },
  {
    "arabic": "وَالْمُجَاهِدُ مَنْ جَاهَدَ نَفْسَهُ فِي طَاعَةِ اللَّهِ",
    "english": "And a [true] warrior is one who exerts himself in obedience to Allah.",
    "source": "Musnad Ahmad, al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "وَالْمُهَاجِرُ مَنْ هَجَرَ الْخَطَايَا وَالذُّنُوبَ",
    "english": "And a [true] emigrant is he who abandons all wrongs and sins.",
    "source": "Musnad Ahmad, al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "الْبَيِّنَةُ عَلَى الْمُدَّعِي وَالْيَمِينُ عَلَى الْمُدَّعَى عَلَيْهِ",
    "english": "The burden of proof is on the accuser and swearing the oath is on the one accused.",
    "source": "al-Bayhaqi"
  },
  {
    "arabic": "الْمُؤْمِنُ مِرْآةُ الْمُؤْمِنِ، وَالْمُؤْمِنُ أَخُو الْمُؤْمِنِ، يُكَفِّلُهُ وَيُحَاطُ بِضَيْعَتِهِ وَيَحْمِيهِ مِنْ وَرَائِهِ",
    "english": "A believer is a mirror for a believer, and a believer is the brother of a believer; he safeguards him from destruction and protects him in his absence.",
    "source": "Sunan Abi Dawud, Jamiʿ al-Tirmidhi, Sahih al-Bukhari & al-Adab al-Mufrad"
  },
  {
    "arabic": "الْمُؤْمِنُونَ كَرَجُلٍ وَاحِدٍ، إِنِ اشْتَكَى عَيْنُهُ اشْتَكَى كُلُّهُ، وَإِنِ اشْتَكَى رَأْسُهُ اشْتَكَى كُلُّهُ",
    "english": "Believers are like a single person; if his eye is in pain his whole body pains, and if his head is in pain his whole body pains.",
    "source": "Sahih Muslim"
  },
  {
    "arabic": "السَّفَرُ قِطْعَةٌ مِنَ الْعَذَابِ، يَمْنَعُ أَحَدَكُمْ نَوَمَهُ وَطَعَامَهُ وَشَرَابَهُ، فَإِذَا قَضَى أَحَدُكُمْ نِيَّتَهُ مِنْ وَجْهِهِ فَلْيُعَجِّلْ إِلَى أَهْلِهِ",
    "english": "Travelling involves a degree of punishment; it deprives one of his sleep, food, and drink. Therefore, when one has accomplished his purpose at his destination, he should hurry back to his family.",
    "source": "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    "arabic": "الْقَافِلَةُ كَغَزْوَةٍ",
    "english": "The return from battle is like the battle itself [in reward].",
    "source": "Sunan Abi Dawud"
  },
  {
    "arabic": "سَيِّدُ الْقَوْمِ فِي السَّفَرِ خَادِمُهُمْ",
    "english": "On a journey, the leader of the group is their servant.",
    "source": "Sunan Ibn Majah, al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    "english": "To seek sacred knowledge is an obligation on every Muslim.",
    "source": "Sunan Ibn Majah"
  },
  {
    "arabic": "أَصْدَقُ الرُّؤْيَا بِالْأَسْحَارِ",
    "english": "The most truthful dreams are [seen] just before dawn.",
    "source": "Jamiʿ al-Tirmidhi"
  },
  {
    "arabic": "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    "english": "The best among you is he who learns the Qur'an and teaches it.",
    "source": "Sahih al-Bukhari"
  },
  {
    "arabic": "أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
    "english": "The most beloved actions in the sight of Allah are the regular ones, even if they amount to little in quantity.",
    "source": "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    "arabic": "مَطْلُ الْغَنِيِّ ظُلْمٌ",
    "english": "Delay in the repayment of debt by a wealthy person is a form of oppression.",
    "source": "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    "arabic": "حُبُّكَ الشَّيْءَ يُعْمِي وَيُصِمُّ",
    "english": "Your love for something blinds and deafens.",
    "source": "Sunan Abi Dawud & Musnad Ahmad"
  },
  {
    "arabic": "مَا قَلَّ وَكَفَى خَيْرٌ مِمَّا كَثُرَ وَأَلْهَى",
    "english": "What is little but sufficient is better than that which is abundant but causes heedlessness.",
    "source": "Ibn Hibban"
  },
  {
    "arabic": "طَلَبُ الْكَسْبِ الْحَلَالِ فَرِيضَةٌ بَعْدَ الْفَرِيضَةِ",
    "english": "To seek lawful earnings is an obligatory duty following other obligatory duties.",
    "source": "al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "حُبُّ الدُّنْيَا رَأْسُ كُلِّ خَطِيئَةٍ",
    "english": "Love of this world is the origin of all sin.",
    "source": "al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "أَفْضَلُ الصَّدَقَةِ أَنْ تُشْبِعَ كَبِدًا جَائِعًا",
    "english": "The most virtuous charity is that you satisfy a hungry stomach.",
    "source": "al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "مَنْهُومَانِ لَا يَشْبَعَانِ: مَنْهُومٌ فِي الْعِلْمِ لَا يَشْبَعُ مِنْهُ، وَمَنْهُومٌ فِي الدُّنْيَا لَا يَشْبَعُ مِنْهَا",
    "english": "Two greedy people are never satiated: one who is greedy for knowledge can never get enough of it, and one who is greedy for worldly possessions can never get enough of them.",
    "source": "al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "أَفْضَلُ الْجِهَادِ أَنْ تَقُولَ كَلِمَةَ حَقٍّ عِنْدَ سُلْطَانٍ جَائِرٍ",
    "english": "The most virtuous jihād is when one speaks a word of truth before an unjust ruler.",
    "source": "Sunan Abi Dawud, Jamiʿ al-Tirmidhi & Sunan Ibn Majah"
  },
  {
    "arabic": "غَدْوَةٌ أَوْ رَوْحَةٌ فِي سَبِيلِ اللَّهِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا",
    "english": "A morning or an evening spent in the path of Allah is more superior than the world and whatever it contains.",
    "source": "Sahih al-Bukhari & Sahih Muslim"
  },
  {
    "arabic": "فَقِيهٌ وَاحِدٌ أَشَدُّ عَلَى الشَّيْطَانِ مِنْ أَلْفِ عَابِدٍ",
    "english": "A single jurist is more severe on Satan than a hundred worshippers.",
    "source": "Jamiʿ al-Tirmidhi & Sunan Ibn Majah"
  },
  {
    "arabic": "طُوبَى لِمَنْ وَجَدَ فِي صَحِيفَتِهِ اسْتِغْفَارًا كَثِيرًا",
    "english": "Glad tidings are for him who finds abundant invocations for forgiveness recorded in his book of deeds.",
    "source": "Sunan Ibn Majah"
  },
  {
    "arabic": "رِضَا اللَّهِ فِي رِضَا الْوَالِدِ، وَسَخَطُ اللَّهِ فِي سَخَطِ الْوَالِدِ",
    "english": "The pleasure of Allah is in the pleasure of the father, and the displeasure of Allah is in the displeasure of the father.",
    "source": "Jamiʿ al-Tirmidhi"
  },
  {
    "arabic": "حَقُّ الْأَخِ الْكَبِيرِ عَلَى الصَّغِيرِ كَحَقِّ الْوَالِدِ عَلَى وَلَدِهِ",
    "english": "The right of an elder brother over the younger ones is like the right of the father over his children.",
    "source": "al-Bayhaqi & Shuʿab al-Iman"
  },
  {
    "arabic": "كُلُّ بَنِي آدَمَ خَطَّاءٌ، وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ",
    "english": "The children of Adam are all profuse wrongdoers, but the best of profuse wrongdoers are those who repent.",
    "source": "Jamiʿ al-Tirmidhi"
  },
  {
    "arabic": "كَمْ مِنْ صَائِمٍ لَيْسَ لَهُ مِنْ صِيَامِهِ إِلَّا الْجُوعُ، وَكَمْ مِنْ قَائِمٍ لَيْسَ لَهُ مِنْ قِيَامِهِ إِلَّا السَّهَرُ",
    "english": "How many there are who fast but do not gain anything from it but hunger, and how many there are who pass the night standing in prayer but do not gain anything from it but sleeplessness.",
    "source": "Sunan al-Darimi"
  },
  {
    "arabic": "مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ",
    "english": "Of the excellence of one's Islam is that he leaves that which does not concern him.",
    "source": "Jamiʿ al-Tirmidhi & Musnad Ahmad"
  }
];

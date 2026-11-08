/*
 * Hand-written Hindi and Gujarati for every piece of English on the site, keyed
 * by the English exactly as it appears on screen (whitespace collapsed). Product
 * names, formulation names, "Krishivam", numbers, phone and email are not listed:
 * they stay in English. Labels joined with " · ", " - " or " | " are translated
 * part by part, so only the parts need an entry.
 *
 * Keep the terms consistent: Organic Fertilizer = जैविक उर्वरक / સેન્દ્રિય ખાતર,
 * Biofertilizer = जैव उर्वरक / જૈવિક ખાતર, portfolio = उत्पाद श्रृंखला / ઉત્પાદન શ્રેણી.
 */
type Tr = { hi: string; gu: string }

export const DICT: Record<string, Tr> = {
  // ── Categories and product taglines ──
  'Organic Fertilizer': { hi: 'जैविक उर्वरक', gu: 'સેન્દ્રિય ખાતર' },
  'Biofertilizer': { hi: 'जैव उर्वरक', gu: 'જૈવિક ખાતર' },
  'Biostimulants': { hi: 'बायोस्टिमुलेंट', gu: 'બાયોસ્ટિમ્યુલન્ટ' },
  'Speciality Liquid Fertilizer': { hi: 'विशेष तरल उर्वरक', gu: 'વિશેષ પ્રવાહી ખાતર' },
  'Organic Manure': { hi: 'जैविक खाद', gu: 'સેન્દ્રિય ખાતર' },
  'Granules': { hi: 'दानेदार', gu: 'દાણાદાર' },
  'Stronger Roots, Healthier Plant': { hi: 'मज़बूत जड़ें, स्वस्थ पौधा', gu: 'મજબૂત મૂળ, તંદુરસ્ત છોડ' },
  'Premium Triple-Action Biostimulant': { hi: 'प्रीमियम ट्रिपल-एक्शन बायोस्टिमुलेंट', gu: 'પ્રીમિયમ ટ્રિપલ-એક્શન બાયોસ્ટિમ્યુલન્ટ' },
  'Floral Enhancer': { hi: 'फूल वर्धक', gu: 'ફૂલ વર્ધક' },
  'Speciality Liquid Fertilizer Range': { hi: 'विशेष तरल उर्वरक रेंज', gu: 'વિશેષ પ્રવાહી ખાતર રેન્જ' },
  'Fortified Calcium Suspension': { hi: 'फोर्टिफाइड कैल्शियम सस्पेंशन', gu: 'ફોર્ટિફાઇડ કેલ્શિયમ સસ્પેન્શન' },
  'Calcium Nitrate + Magnesium': { hi: 'कैल्शियम नाइट्रेट + मैग्नीशियम', gu: 'કેલ્શિયમ નાઇટ્રેટ + મેગ્નેશિયમ' },
  'Boron Ethanolamine': { hi: 'बोरॉन इथेनॉलामाइन', gu: 'બોરોન ઇથેનોલામાઇન' },
  'Organic Fertilizer, Biofertilizer, Biostimulants, Speciality Liquid Fertilizer, Cultivating Tomorrow': {
    hi: 'जैविक उर्वरक, जैव उर्वरक, बायोस्टिमुलेंट, विशेष तरल उर्वरक, खेती, कल के लिए',
    gu: 'સેન્દ્રિય ખાતર, જૈવિક ખાતર, બાયોસ્ટિમ્યુલન્ટ, વિશેષ પ્રવાહી ખાતર, ખેતી, આવતીકાલ માટે',
  },

  // ── Header, footer and shared ──
  'Skip to content': { hi: 'मुख्य सामग्री पर जाएँ', gu: 'મુખ્ય સામગ્રી પર જાઓ' },
  'Krishivam home': { hi: 'Krishivam होम', gu: 'Krishivam હોમ' },
  'Main': { hi: 'मुख्य मेनू', gu: 'મુખ્ય મેનુ' },
  'Mobile': { hi: 'मोबाइल मेनू', gu: 'મોબાઇલ મેનુ' },
  'Open menu': { hi: 'मेनू खोलें', gu: 'મેનુ ખોલો' },
  'Close menu': { hi: 'मेनू बंद करें', gu: 'મેનુ બંધ કરો' },
  'Loading page': { hi: 'पेज लोड हो रहा है', gu: 'પેજ લોડ થઈ રહ્યું છે' },
  'Cultivating Tomorrow': { hi: 'खेती, कल के लिए', gu: 'ખેતી, આવતીકાલ માટે' },
  'Nurturing Nature.': { hi: 'प्रकृति का पोषण।', gu: 'પ્રકૃતિનું જતન.' },
  'Enriching Lives.': { hi: 'जीवन में समृद्धि।', gu: 'જીવનમાં સમૃદ્ધિ.' },
  'Nurturing Nature. Enriching Lives.': { hi: 'प्रकृति का पोषण। जीवन में समृद्धि।', gu: 'પ્રકૃતિનું જતન. જીવનમાં સમૃદ્ધિ.' },
  'Science-driven agricultural solutions for modern farming needs.': {
    hi: 'आधुनिक खेती की ज़रूरतों के लिए विज्ञान-आधारित कृषि समाधान।',
    gu: 'આધુનિક ખેતીની જરૂરિયાતો માટે વિજ્ઞાન-આધારિત કૃષિ ઉકેલો.',
  },
  'Start a conversation': { hi: 'बातचीत शुरू करें', gu: 'વાતચીત શરૂ કરો' },
  'Follow us': { hi: 'हमें फ़ॉलो करें', gu: 'અમને ફોલો કરો' },
  'Like our page': { hi: 'हमारा पेज लाइक करें', gu: 'અમારું પેજ લાઇક કરો' },
  'Company': { hi: 'कंपनी', gu: 'કંપની' },
  'Home': { hi: 'होम', gu: 'હોમ' },
  'About Us': { hi: 'हमारे बारे में', gu: 'અમારા વિશે' },
  'Our Mission': { hi: 'हमारा मिशन', gu: 'અમારું મિશન' },
  'Services': { hi: 'सेवाएँ', gu: 'સેવાઓ' },
  'Contact': { hi: 'संपर्क', gu: 'સંપર્ક' },
  'Contact Us': { hi: 'संपर्क करें', gu: 'સંપર્ક કરો' },
  'Get in touch': { hi: 'संपर्क करें', gu: 'સંપર્ક કરો' },
  'Products': { hi: 'उत्पाद', gu: 'ઉત્પાદનો' },
  'products': { hi: 'उत्पाद', gu: 'ઉત્પાદનો' },
  'Product': { hi: 'उत्पाद', gu: 'ઉત્પાદન' },
  'product': { hi: 'उत्पाद', gu: 'ઉત્પાદન' },
  'Satellite, Ahmedabad, Gujarat, India': { hi: 'सैटेलाइट, अहमदाबाद, गुजरात, भारत', gu: 'સેટેલાઇટ, અમદાવાદ, ગુજરાત, ભારત' },
  'Satellite, Ahmedabad': { hi: 'सैटेलाइट, अहमदाबाद', gu: 'સેટેલાઇટ, અમદાવાદ' },
  'Gujarat, India': { hi: 'गुजरात, भारत', gu: 'ગુજરાત, ભારત' },
  'Ahmedabad': { hi: 'अहमदाबाद', gu: 'અમદાવાદ' },
  '. All Rights Reserved.': { hi: '. सर्वाधिकार सुरक्षित।', gu: '. સર્વ હક્ક સ્વાધીન.' },
  'Call': { hi: 'कॉल करें', gu: 'કૉલ કરો' },
  'call': { hi: 'कॉल करें', gu: 'કૉલ કરો' },
  '/ email': { hi: '/ ईमेल करें', gu: '/ ઇમેઇલ કરો' },
  'View': { hi: 'देखें', gu: 'જુઓ' },
  'View product': { hi: 'उत्पाद देखें', gu: 'ઉત્પાદન જુઓ' },

  // ── Page titles ──
  'Organic Fertilizer, Biostimulant & Liquid Fertilizer Company in Ahmedabad': {
    hi: 'अहमदाबाद की जैविक उर्वरक, बायोस्टिमुलेंट और तरल उर्वरक कंपनी',
    gu: 'અમદાવાદની સેન્દ્રિય ખાતર, બાયોસ્ટિમ્યુલન્ટ અને પ્રવાહી ખાતર કંપની',
  },
  'Fertilizer & Biostimulant Products': { hi: 'उर्वरक और बायोस्टिमुलेंट उत्पाद', gu: 'ખાતર અને બાયોસ્ટિમ્યુલન્ટ ઉત્પાદનો' },
  'Services for Farmers & Dealers': { hi: 'किसानों और डीलरों के लिए सेवाएँ', gu: 'ખેડૂતો અને ડીલરો માટે સેવાઓ' },
  'Our Mission & Values': { hi: 'हमारा मिशन और मूल्य', gu: 'અમારું મિશન અને મૂલ્યો' },
  'Krishivam Agriscience, Ahmedabad': { hi: 'Krishivam Agriscience, अहमदाबाद', gu: 'Krishivam Agriscience, અમદાવાદ' },
  'New Products Coming Soon': { hi: 'नए उत्पाद जल्द आ रहे हैं', gu: 'નવા ઉત્પાદનો ટૂંક સમયમાં' },
  'Page not found': { hi: 'पेज नहीं मिला', gu: 'પેજ મળ્યું નથી' },

  // ── Home: hero ──
  'Agriscience · Ahmedabad, India': { hi: 'कृषि विज्ञान · अहमदाबाद, भारत', gu: 'કૃષિ વિજ્ઞાન · અમદાવાદ, ભારત' },
  'Science-driven agricultural solutions for healthier soils, stronger crops and more abundant harvests.': {
    hi: 'स्वस्थ मिट्टी, मज़बूत फसल और भरपूर पैदावार के लिए विज्ञान-आधारित कृषि समाधान।',
    gu: 'તંદુરસ્ત જમીન, મજબૂત પાક અને ભરપૂર ઉત્પાદન માટે વિજ્ઞાન-આધારિત કૃષિ ઉકેલો.',
  },
  'Explore Products': { hi: 'उत्पाद देखें', gu: 'ઉત્પાદનો જુઓ' },
  'Categories': { hi: 'श्रेणियाँ', gu: 'શ્રેણીઓ' },
  'Product lines': { hi: 'उत्पाद', gu: 'ઉત્પાદનો' },
  'Formulations': { hi: 'फॉर्मूलेशन', gu: 'ફોર્મ્યુલેશન' },
  'Scroll': { hi: 'स्क्रॉल करें', gu: 'સ્ક્રોલ કરો' },
  'Our promise': { hi: 'हमारा वादा', gu: 'અમારું વચન' },

  // ── Home: approach ──
  'The Krishivam approach': { hi: 'Krishivam का दृष्टिकोण', gu: 'Krishivam નો અભિગમ' },
  'Krishivam Agriscience develops and supplies agricultural fertilizer and crop-input solutions designed around modern farming needs.': {
    hi: 'Krishivam Agriscience आधुनिक खेती की ज़रूरतों को ध्यान में रखकर बनाए गए कृषि उर्वरक और फसल-इनपुट समाधान विकसित करती है और उपलब्ध कराती है।',
    gu: 'Krishivam Agriscience આધુનિક ખેતીની જરૂરિયાતોને ધ્યાનમાં રાખીને તૈયાર કરાયેલા કૃષિ ખાતર અને પાક-ઇનપુટ ઉકેલો વિકસાવે છે અને પૂરા પાડે છે.',
  },
  'Rooted in agriculture, driven by science.': { hi: 'जड़ें खेती में, दिशा विज्ञान से।', gu: 'મૂળ ખેતીમાં, દિશા વિજ્ઞાનથી.' },
  'Nature-led': { hi: 'प्रकृति-प्रेरित', gu: 'પ્રકૃતિ-પ્રેરિત' },
  'Organic and biological inputs that work with the soil, not against it.': {
    hi: 'जैविक इनपुट, जो मिट्टी के ख़िलाफ़ नहीं, उसके साथ मिलकर काम करते हैं।',
    gu: 'સેન્દ્રિય અને જૈવિક ઇનપુટ્સ, જે જમીનની વિરુદ્ધ નહીં, તેની સાથે મળીને કામ કરે છે.',
  },
  'Science-minded': { hi: 'विज्ञान-आधारित', gu: 'વિજ્ઞાન-આધારિત' },
  'Precise, label-true formulations for measurable crop nutrition.': {
    hi: 'सटीक फॉर्मूलेशन, ठीक वैसे ही जैसा लेबल पर लिखा है, ताकि फसल पोषण का असर दिखे।',
    gu: 'ચોક્કસ ફોર્મ્યુલેશન, બરાબર લેબલ પર લખ્યા મુજબ, જેથી પાક પોષણની અસર દેખાય.',
  },
  'Future-focused': { hi: 'भविष्य पर केंद्रित', gu: 'ભવિષ્ય પર કેન્દ્રિત' },
  'A growing portfolio built for the way farming is changing.': {
    hi: 'बदलती खेती के अनुरूप लगातार बढ़ती उत्पाद श्रृंखला।',
    gu: 'બદલાતી ખેતીને અનુરૂપ સતત વધતી ઉત્પાદન શ્રેણી.',
  },
  'Discover Krishivam': { hi: 'Krishivam को जानें', gu: 'Krishivam ને જાણો' },

  // ── Home: range wheel, portfolio, INVICTUS ──
  'Top Products': { hi: 'प्रमुख उत्पाद', gu: 'મુખ્ય ઉત્પાદનો' },
  'The range': { hi: 'उत्पाद रेंज', gu: 'ઉત્પાદન રેન્જ' },
  'Every pack,': { hi: 'हर पैक,', gu: 'દરેક પેક,' },
  'one turn at a time.': { hi: 'एक-एक करके।', gu: 'એક પછી એક.' },
  'Keep scrolling to turn the wheel through the Krishivam range.': {
    hi: 'Krishivam की पूरी रेंज देखने के लिए स्क्रॉल करते रहें।',
    gu: 'Krishivam ની આખી રેન્જ જોવા માટે સ્ક્રોલ કરતા રહો.',
  },
  'Portfolio': { hi: 'उत्पाद श्रृंखला', gu: 'ઉત્પાદન શ્રેણી' },
  'Four categories. One standard of care.': { hi: 'चार श्रेणियाँ। गुणवत्ता का एक ही मानक।', gu: 'ચાર શ્રેણીઓ. ગુણવત્તાનું એક જ ધોરણ.' },
  'A focused portfolio across organic fertilizers, biostimulants, biofertilizers and speciality liquid fertilizers.': {
    hi: 'जैविक उर्वरक, बायोस्टिमुलेंट, जैव उर्वरक और विशेष तरल उर्वरकों की एक केंद्रित उत्पाद श्रृंखला।',
    gu: 'સેન્દ્રિય ખાતર, બાયોસ્ટિમ્યુલન્ટ, જૈવિક ખાતર અને વિશેષ પ્રવાહી ખાતરોની એક કેન્દ્રિત ઉત્પાદન શ્રેણી.',
  },
  'Natural-origin agricultural nutrition that builds soil health season after season.': {
    hi: 'प्राकृतिक स्रोत से बना कृषि पोषण, जो हर मौसम में मिट्टी की सेहत सुधारता है।',
    gu: 'કુદરતી સ્ત્રોતમાંથી બનેલું કૃષિ પોષણ, જે દરેક ઋતુમાં જમીનનું સ્વાસ્થ્ય સુધારે છે.',
  },
  'Biological agricultural inputs for stronger roots and healthier plants.': {
    hi: 'मज़बूत जड़ों और स्वस्थ पौधों के लिए जैविक कृषि इनपुट।',
    gu: 'મજબૂત મૂળ અને તંદુરસ્ત છોડ માટે જૈવિક કૃષિ ઇનપુટ્સ.',
  },
  'Solutions focused on supporting modern crop management, vigour and flowering.': {
    hi: 'आधुनिक फसल प्रबंधन, पौधों की ताक़त और फूल आने में मदद करने वाले समाधान।',
    gu: 'આધુનિક પાક વ્યવસ્થાપન, છોડના જોમ અને ફૂલ બેસવામાં મદદરૂપ ઉકેલો.',
  },
  'Precisely formulated liquid nutrition - macro, secondary and micronutrients.': {
    hi: 'सटीक रूप से तैयार तरल पोषण - मुख्य, द्वितीयक और सूक्ष्म पोषक तत्व।',
    gu: 'ચોકસાઈથી તૈયાર કરાયેલું પ્રવાહી પોષણ - મુખ્ય, ગૌણ અને સૂક્ષ્મ પોષક તત્વો.',
  },
  'Explore category': { hi: 'श्रेणी देखें', gu: 'શ્રેણી જુઓ' },
  'INVICTUS formulations': { hi: 'INVICTUS फॉर्मूलेशन', gu: 'INVICTUS ફોર્મ્યુલેશન' },
  'Speciality liquids': { hi: 'विशेष तरल उर्वरक', gu: 'વિશેષ પ્રવાહી ખાતર' },
  'one name, five precise formulations.': { hi: 'एक नाम, पाँच सटीक फॉर्मूलेशन।', gu: 'એક નામ, પાંચ ચોક્કસ ફોર્મ્યુલેશન.' },
  'Balanced NPK, targeted NP and NK liquids, and micronutrient concentrates - each colour-coded on the pack so the right one is easy to pick.': {
    hi: 'संतुलित NPK, लक्षित NP और NK तरल, और सूक्ष्म पोषक तत्वों के कॉन्सन्ट्रेट - हर एक का पैक अलग रंग का है, ताकि सही उत्पाद चुनना आसान हो।',
    gu: 'સંતુલિત NPK, લક્ષિત NP અને NK પ્રવાહી, અને સૂક્ષ્મ પોષક તત્વોના કોન્સન્ટ્રેટ - દરેકનું પેક અલગ રંગનું છે, જેથી સાચું ઉત્પાદન પસંદ કરવું સરળ બને.',
  },
  'Explore INVICTUS': { hi: 'INVICTUS देखें', gu: 'INVICTUS જુઓ' },
  'Liquid Fertilizer': { hi: 'तरल उर्वरक', gu: 'પ્રવાહી ખાતર' },
  'Liquid fertilizer': { hi: 'तरल उर्वरक', gu: 'પ્રવાહી ખાતર' },
  'Fortified with Zinc & Boron (suspension)': { hi: 'जिंक और बोरॉन से समृद्ध (सस्पेंशन)', gu: 'ઝીંક અને બોરોનથી સમૃદ્ધ (સસ્પેન્શન)' },
  'Fortified NP liquid': { hi: 'समृद्ध NP तरल', gu: 'સમૃદ્ધ NP પ્રવાહી' },
  'Fortified with Calcium, Magnesium & Boron': { hi: 'कैल्शियम, मैग्नीशियम और बोरॉन से समृद्ध', gu: 'કેલ્શિયમ, મેગ્નેશિયમ અને બોરોનથી સમૃદ્ધ' },
  'Micronutrient': { hi: 'सूक्ष्म पोषक तत्व', gu: 'સૂક્ષ્મ પોષક તત્વ' },
  'Zinc oxide suspension concentrate': { hi: 'जिंक ऑक्साइड सस्पेंशन कॉन्सन्ट्रेट', gu: 'ઝીંક ઓક્સાઇડ સસ્પેન્શન કોન્સન્ટ્રેટ' },
  'Concentrated liquid calcium, 100% water soluble': { hi: 'गाढ़ा तरल कैल्शियम, 100% पानी में घुलनशील', gu: 'સાંદ્ર પ્રવાહી કેલ્શિયમ, 100% પાણીમાં દ્રાવ્ય' },

  // ── Home: values and call to action ──
  'What guides us': { hi: 'हमारा मार्गदर्शन', gu: 'અમારું માર્ગદર્શન' },
  'Growing better.': { hi: 'बेहतर विकास।', gu: 'વધુ સારો વિકાસ.' },
  'Together.': { hi: 'साथ मिलकर।', gu: 'સાથે મળીને.' },
  'Growing better. Together.': { hi: 'बेहतर विकास। साथ मिलकर।', gu: 'વધુ સારો વિકાસ. સાથે મળીને.' },
  'Our Vision': { hi: 'हमारा विज़न', gu: 'અમારું વિઝન' },
  'A future where agricultural inputs are approached with greater care, clarity and scientific intent.': {
    hi: 'ऐसा भविष्य, जहाँ कृषि इनपुट का उपयोग अधिक सावधानी, स्पष्टता और वैज्ञानिक सोच के साथ हो।',
    gu: 'એવું ભવિષ્ય, જ્યાં કૃષિ ઇનપુટ્સનો ઉપયોગ વધુ કાળજી, સ્પષ્ટતા અને વૈજ્ઞાનિક દૃષ્ટિ સાથે થાય.',
  },
  'Develop and supply thoughtful agricultural solutions aligned with modern farming needs.': {
    hi: 'आधुनिक खेती की ज़रूरतों के अनुरूप, सोच-समझकर बनाए गए कृषि समाधान विकसित करना और उपलब्ध कराना।',
    gu: 'આધુનિક ખેતીની જરૂરિયાતોને અનુરૂપ, વિચારપૂર્વક તૈયાર કરાયેલા કૃષિ ઉકેલો વિકસાવવા અને પૂરા પાડવા.',
  },
  'Innovation': { hi: 'नवाचार', gu: 'નવીનતા' },
  'Keep learning, improving and building a portfolio ready for changing agricultural needs.': {
    hi: 'लगातार सीखते रहना, सुधार करते रहना और बदलती कृषि ज़रूरतों के लिए तैयार उत्पाद श्रृंखला बनाना।',
    gu: 'સતત શીખતા રહેવું, સુધારતા રહેવું અને બદલાતી કૃષિ જરૂરિયાતો માટે તૈયાર ઉત્પાદન શ્રેણી બનાવવી.',
  },
  'Sustainability': { hi: 'टिकाऊपन', gu: 'ટકાઉપણું' },
  'Support responsible agricultural thinking and long-term stewardship of soil and natural resources.': {
    hi: 'ज़िम्मेदार कृषि सोच और मिट्टी व प्राकृतिक संसाधनों की लंबे समय तक देखभाल को बढ़ावा देना।',
    gu: 'જવાબદાર કૃષિ વિચારસરણી અને જમીન તથા કુદરતી સંસાધનોની લાંબા ગાળાની જાળવણીને પ્રોત્સાહન આપવું.',
  },
  'Partnership': { hi: 'साझेदारी', gu: 'ભાગીદારી' },
  'Build dependable relationships across the agricultural ecosystem.': {
    hi: 'पूरे कृषि क्षेत्र में भरोसेमंद रिश्ते बनाना।',
    gu: 'સમગ્ર કૃષિ ક્ષેત્રમાં વિશ્વસનીય સંબંધો બાંધવા.',
  },
  'Farmer-focused': { hi: 'किसान-केंद्रित', gu: 'ખેડૂત-કેન્દ્રિત' },
  'Keep practical agricultural needs at the centre of product thinking.': {
    hi: 'उत्पाद बनाते समय खेती की व्यावहारिक ज़रूरतों को सबसे आगे रखना।',
    gu: 'ઉત્પાદન વિશે વિચારતી વખતે ખેતીની વ્યવહારુ જરૂરિયાતોને કેન્દ્રમાં રાખવી.',
  },
  'Let’s talk': { hi: 'आइए बात करें', gu: 'ચાલો વાત કરીએ' },
  'Let’s grow something together.': { hi: 'आइए, साथ मिलकर कुछ उगाएँ।', gu: 'ચાલો, સાથે મળીને કંઈક ઉગાડીએ.' },
  'Product enquiries, dealership conversations or a question about a crop - the Krishivam team is a call away.': {
    hi: 'उत्पाद की जानकारी, डीलरशिप की बात या फसल से जुड़ा कोई सवाल - Krishivam टीम बस एक कॉल दूर है।',
    gu: 'ઉત્પાદનની પૂછપરછ, ડીલરશિપની વાત કે પાક વિશે કોઈ પ્રશ્ન - Krishivam ટીમ ફક્ત એક કૉલ દૂર છે.',
  },
  'Send an enquiry': { hi: 'पूछताछ भेजें', gu: 'પૂછપરછ મોકલો' },
  'Products, dealership or crop questions': { hi: 'उत्पाद, डीलरशिप या फसल से जुड़े सवाल', gu: 'ઉત્પાદન, ડીલરશિપ કે પાક વિશેના પ્રશ્નો' },
  'Talk to the Krishivam team': { hi: 'Krishivam टीम से बात करें', gu: 'Krishivam ટીમ સાથે વાત કરો' },

  // ── Products and categories ──
  'Agricultural solutions, thoughtfully developed.': { hi: 'सोच-समझकर विकसित किए गए कृषि समाधान।', gu: 'વિચારપૂર્વક વિકસાવેલા કૃષિ ઉકેલો.' },
  'Explore Krishivam’s product architecture across four focused agricultural-input categories.': {
    hi: 'चार कृषि-इनपुट श्रेणियों में फैली Krishivam की उत्पाद श्रृंखला देखें।',
    gu: 'ચાર કૃષિ-ઇનપુટ શ્રેણીઓમાં ફેલાયેલી Krishivam ની ઉત્પાદન શ્રેણી જુઓ.',
  },
  'Browse by category': { hi: 'श्रेणी के अनुसार देखें', gu: 'શ્રેણી મુજબ જુઓ' },
  'A focused portfolio.': { hi: 'एक केंद्रित उत्पाद श्रृंखला।', gu: 'એક કેન્દ્રિત ઉત્પાદન શ્રેણી.' },
  'All products': { hi: 'सभी उत्पाद', gu: 'બધા ઉત્પાદનો' },
  'Find the right product.': { hi: 'सही उत्पाद चुनें।', gu: 'યોગ્ય ઉત્પાદન શોધો.' },
  'Search products': { hi: 'उत्पाद खोजें', gu: 'ઉત્પાદન શોધો' },
  'Filter by category': { hi: 'श्रेणी के अनुसार छाँटें', gu: 'શ્રેણી મુજબ ગાળો' },
  'All': { hi: 'सभी', gu: 'બધા' },
  'Explore the range.': { hi: 'रेंज देखें।', gu: 'રેન્જ જુઓ.' },
  'Other categories': { hi: 'अन्य श्रेणियाँ', gu: 'અન્ય શ્રેણીઓ' },

  // ── Product pages ──
  'A premium organic manure in granule form, made for soils that need to keep giving.': {
    hi: 'दानेदार रूप में प्रीमियम जैविक खाद, उन खेतों के लिए जिनसे साल-दर-साल अच्छी उपज चाहिए।',
    gu: 'દાણાદાર સ્વરૂપમાં પ્રીમિયમ સેન્દ્રિય ખાતર, એવી જમીન માટે જેમાંથી વર્ષોવર્ષ સારું ઉત્પાદન જોઈએ.',
  },
  'Improves soil health': { hi: 'मिट्टी की सेहत सुधारे', gu: 'જમીનનું સ્વાસ્થ્ય સુધારે' },
  'Enhances crop growth': { hi: 'फसल की बढ़वार बढ़ाए', gu: 'પાકની વૃદ્ધિ વધારે' },
  'Increases yield': { hi: 'पैदावार बढ़ाए', gu: 'ઉત્પાદન વધારે' },
  'Sustains soil fertility': { hi: 'मिट्टी की उर्वरता बनाए रखे', gu: 'જમીનની ફળદ્રુપતા જાળવે' },
  'A biological input for stronger roots and healthier plants, with an assured cell count.': {
    hi: 'मज़बूत जड़ों और स्वस्थ पौधों के लिए जैविक इनपुट, सुनिश्चित सेल काउंट के साथ।',
    gu: 'મજબૂત મૂળ અને તંદુરસ્ત છોડ માટે જૈવિક ઇનપુટ, ખાતરીપૂર્વકના સેલ કાઉન્ટ સાથે.',
  },
  'Boosts root development': { hi: 'जड़ों का विकास बढ़ाए', gu: 'મૂળનો વિકાસ વધારે' },
  'Faster plant recovery': { hi: 'पौधा जल्दी संभले', gu: 'છોડ ઝડપથી બેઠો થાય' },
  '100% organic': { hi: '100% जैविक', gu: '100% સેન્દ્રિય' },
  'Assured cell count': { hi: 'सुनिश्चित सेल काउंट', gu: 'ખાતરીપૂર્વકનો સેલ કાઉન્ટ' },
  'A premium triple-action biostimulant combining humic acid, seaweed and protein hydrolysate.': {
    hi: 'ह्यूमिक एसिड, समुद्री शैवाल और प्रोटीन हाइड्रोलाइसेट से बना प्रीमियम ट्रिपल-एक्शन बायोस्टिमुलेंट।',
    gu: 'હ્યુમિક એસિડ, દરિયાઈ શેવાળ અને પ્રોટીન હાઇડ્રોલાઇઝેટથી બનેલું પ્રીમિયમ ટ્રિપલ-એક્શન બાયોસ્ટિમ્યુલન્ટ.',
  },
  'Triple-action formulation': { hi: 'ट्रिपल-एक्शन फॉर्मूलेशन', gu: 'ટ્રિપલ-એક્શન ફોર્મ્યુલેશન' },
  'Humic acid base': { hi: 'ह्यूमिक एसिड आधारित', gu: 'હ્યુમિક એસિડ આધારિત' },
  'Seaweed enriched': { hi: 'समुद्री शैवाल से भरपूर', gu: 'દરિયાઈ શેવાળથી ભરપૂર' },
  'Protein hydrolysate': { hi: 'प्रोटीन हाइड्रोलाइसेट', gu: 'પ્રોટીન હાઇડ્રોલાઇઝેટ' },
  'Humic acid': { hi: 'ह्यूमिक एसिड', gu: 'હ્યુમિક એસિડ' },
  'Seaweed': { hi: 'समुद्री शैवाल', gu: 'દરિયાઈ શેવાળ' },
  'A modern biostimulant positioned within Krishivam’s crop-input portfolio.': {
    hi: 'Krishivam की फसल-इनपुट श्रृंखला का एक आधुनिक बायोस्टिमुलेंट।',
    gu: 'Krishivam ની પાક-ઇનપુટ શ્રેણીનું એક આધુનિક બાયોસ્ટિમ્યુલન્ટ.',
  },
  'A cytokinin-based floral enhancer that supports flower bud development, flowering and fruit formation.': {
    hi: 'साइटोकाइनिन-आधारित फूल वर्धक, जो कलियों के विकास, फूल आने और फल बनने में मदद करता है।',
    gu: 'સાયટોકાઇનિન-આધારિત ફૂલ વર્ધક, જે કળીઓના વિકાસ, ફૂલ બેસવા અને ફળ બેસવામાં મદદ કરે છે.',
  },
  'Reduces pre-harvest flower drop': { hi: 'कटाई से पहले फूल झड़ना कम करे', gu: 'કાપણી પહેલાં ફૂલ ખરવાનું ઘટાડે' },
  'Reduces pre-harvest fruit drop': { hi: 'कटाई से पहले फल झड़ना कम करे', gu: 'કાપણી પહેલાં ફળ ખરવાનું ઘટાડે' },
  'Stimulates flower generation by about 20-30%': { hi: 'फूल आने में लगभग 20-30% बढ़ोतरी', gu: 'ફૂલ બેસવામાં આશરે 20-30% વધારો' },
  'Provides additional energy for better yield': { hi: 'बेहतर पैदावार के लिए अतिरिक्त ऊर्जा दे', gu: 'વધુ સારા ઉત્પાદન માટે વધારાની ઊર્જા આપે' },
  'Fixes nutrient imbalance': { hi: 'पोषक तत्वों का असंतुलन ठीक करे', gu: 'પોષક તત્વોનું અસંતુલન સુધારે' },
  'Eco-friendly and cost-effective': { hi: 'पर्यावरण के अनुकूल और किफ़ायती', gu: 'પર્યાવરણને અનુકૂળ અને કિફાયતી' },
  'One name, a family of precise liquid formulations - from balanced NPK to targeted micronutrients.': {
    hi: 'एक नाम, सटीक तरल फॉर्मूलेशन की पूरी श्रृंखला - संतुलित NPK से लेकर लक्षित सूक्ष्म पोषक तत्वों तक।',
    gu: 'એક નામ, ચોક્કસ પ્રવાહી ફોર્મ્યુલેશનની આખી શ્રેણી - સંતુલિત NPK થી લઈને લક્ષિત સૂક્ષ્મ પોષક તત્વો સુધી.',
  },
  'NPK, NP and NK liquids': { hi: 'NPK, NP और NK तरल', gu: 'NPK, NP અને NK પ્રવાહી' },
  'Calcium, Zinc and Boron': { hi: 'कैल्शियम, जिंक और बोरॉन', gu: 'કેલ્શિયમ, ઝીંક અને બોરોન' },
  'Suspension formulations': { hi: 'सस्पेंशन फॉर्मूलेशन', gu: 'સસ્પેન્શન ફોર્મ્યુલેશન' },
  '100% water-soluble options': { hi: '100% पानी में घुलनशील विकल्प', gu: '100% પાણીમાં દ્રાવ્ય વિકલ્પો' },
  'A fortified calcium suspension enriched with zinc and boron.': {
    hi: 'जिंक और बोरॉन से समृद्ध फोर्टिफाइड कैल्शियम सस्पेंशन।',
    gu: 'ઝીંક અને બોરોનથી સમૃદ્ધ ફોર્ટિફાઇડ કેલ્શિયમ સસ્પેન્શન.',
  },
  'High calcium content': { hi: 'अधिक कैल्शियम मात्रा', gu: 'વધુ કેલ્શિયમ પ્રમાણ' },
  'Zinc fortified': { hi: 'जिंक युक्त', gu: 'ઝીંક યુક્ત' },
  'Boron fortified': { hi: 'बोरॉन युक्त', gu: 'બોરોન યુક્ત' },
  'Liquid suspension': { hi: 'तरल सस्पेंशन', gu: 'પ્રવાહી સસ્પેન્શન' },
  'Calcium nitrate fortified with magnesium, as a fully water-soluble suspension.': {
    hi: 'मैग्नीशियम से समृद्ध कैल्शियम नाइट्रेट, पूरी तरह पानी में घुलनशील सस्पेंशन के रूप में।',
    gu: 'મેગ્નેશિયમથી સમૃદ્ધ કેલ્શિયમ નાઇટ્રેટ, સંપૂર્ણ પાણીમાં દ્રાવ્ય સસ્પેન્શન સ્વરૂપે.',
  },
  'Calcium nitrate base': { hi: 'कैल्शियम नाइट्रेट आधारित', gu: 'કેલ્શિયમ નાઇટ્રેટ આધારિત' },
  'Fortified with magnesium': { hi: 'मैग्नीशियम से समृद्ध', gu: 'મેગ્નેશિયમથી સમૃદ્ધ' },
  '100% water soluble': { hi: '100% पानी में घुलनशील', gu: '100% પાણીમાં દ્રાવ્ય' },
  'A boron ethanolamine micronutrient fertilizer for targeted boron nutrition.': {
    hi: 'लक्षित बोरॉन पोषण के लिए बोरॉन इथेनॉलामाइन सूक्ष्म पोषक उर्वरक।',
    gu: 'લક્ષિત બોરોન પોષણ માટે બોરોન ઇથેનોલામાઇન સૂક્ષ્મ પોષક ખાતર.',
  },
  'Boron ethanolamine': { hi: 'बोरॉन इथेनॉलामाइन', gu: 'બોરોન ઇથેનોલામાઇન' },
  'Micronutrient fertilizer': { hi: 'सूक्ष्म पोषक उर्वरक', gu: 'સૂક્ષ્મ પોષક ખાતર' },
  'Liquid formulation': { hi: 'तरल फॉर्मूलेशन', gu: 'પ્રવાહી ફોર્મ્યુલેશન' },
  'Easy to apply': { hi: 'इस्तेमाल में आसान', gu: 'વાપરવામાં સરળ' },
  'Enquire now': { hi: 'अभी पूछताछ करें', gu: 'હમણાં પૂછપરછ કરો' },
  'Made to do one job well.': { hi: 'एक काम, पूरी कुशलता से।', gu: 'એક કામ, પૂરી કુશળતાથી.' },
  'Product information': { hi: 'उत्पाद जानकारी', gu: 'ઉત્પાદન માહિતી' },
  'At a glance.': { hi: 'एक नज़र में।', gu: 'એક નજરે.' },
  'Full technical details, crop recommendations and dosage guidance are available from the Krishivam team on request.': {
    hi: 'पूरी तकनीकी जानकारी, फसल के अनुसार सलाह और मात्रा संबंधी मार्गदर्शन Krishivam टीम से माँगने पर उपलब्ध है।',
    gu: 'સંપૂર્ણ ટેકનિકલ વિગતો, પાક મુજબ ભલામણો અને ડોઝ અંગે માર્ગદર્શન Krishivam ટીમ પાસેથી વિનંતી પર ઉપલબ્ધ છે.',
  },
  'Category': { hi: 'श्रेणी', gu: 'શ્રેણી' },
  'Type': { hi: 'प्रकार', gu: 'પ્રકાર' },
  'Organic manure (granules)': { hi: 'जैविक खाद (दानेदार)', gu: 'સેન્દ્રિય ખાતર (દાણાદાર)' },
  'Certification mark': { hi: 'प्रमाणन चिह्न', gu: 'પ્રમાણન ચિહ્ન' },
  'Pack size': { hi: 'पैक साइज़', gu: 'પેક સાઇઝ' },
  'Interested in this product?': { hi: 'इस उत्पाद में रुचि है?', gu: 'આ ઉત્પાદનમાં રસ છે?' },
  'You may also like': { hi: 'आपको ये भी पसंद आ सकते हैं', gu: 'તમને આ પણ ગમી શકે' },
  'Composition, as labelled': { hi: 'संरचना, लेबल के अनुसार', gu: 'ઘટકો, લેબલ મુજબ' },
  'Dosage (field)': { hi: 'मात्रा (खेत में)', gu: 'ડોઝ (ખેતરમાં)' },
  'Dosage (spray)': { hi: 'मात्रा (छिड़काव)', gu: 'ડોઝ (છંટકાવ)' },
  '300-350 g per acre': { hi: '300-350 ग्राम प्रति एकड़', gu: '300-350 ગ્રામ પ્રતિ એકર' },
  '20-30 g per 15 L pump': { hi: '15 लीटर पंप में 20-30 ग्राम', gu: '15 લિટર પંપમાં 20-30 ગ્રામ' },
  'Active': { hi: 'सक्रिय तत्व', gu: 'સક્રિય ઘટક' },
  'Cytokinin (source: Zea mays kernel)': { hi: 'साइटोकाइनिन (स्रोत: मक्के के दाने)', gu: 'સાયટોકાઇનિન (સ્ત્રોત: મકાઈના દાણા)' },
  'Application': { hi: 'उपयोग का तरीका', gu: 'વાપરવાની રીત' },
  'Foliar spray': { hi: 'पत्तियों पर छिड़काव', gu: 'પાંદડા પર છંટકાવ' },
  'Dose': { hi: 'मात्रा', gu: 'ડોઝ' },
  '1-1.5 ml per 1 L water': { hi: '1 लीटर पानी में 1-1.5 मिली', gu: '1 લિટર પાણીમાં 1-1.5 મિલી' },
  'Pick the formulation your crop needs.': { hi: 'अपनी फसल की ज़रूरत के अनुसार फॉर्मूलेशन चुनें।', gu: 'તમારા પાકની જરૂરિયાત મુજબ ફોર્મ્યુલેશન પસંદ કરો.' },
  'Calcium (Ca)': { hi: 'कैल्शियम (Ca)', gu: 'કેલ્શિયમ (Ca)' },
  'Zinc (Zn)': { hi: 'जिंक (Zn)', gu: 'ઝીંક (Zn)' },
  'Boron (B)': { hi: 'बोरॉन (B)', gu: 'બોરોન (B)' },
  'Mixture of liquid fertilizer': { hi: 'तरल उर्वरक मिश्रण', gu: 'પ્રવાહી ખાતરનું મિશ્રણ' },
  'Solubility': { hi: 'घुलनशीलता', gu: 'દ્રાવ્યતા' },

  // ── Services ──
  'Support for the agricultural journey.': { hi: 'खेती के हर क़दम पर साथ।', gu: 'ખેતીના દરેક પગલે સાથ.' },
  'Beyond the pack: the ways Krishivam works with farmers, dealers and partners.': {
    hi: 'पैक से आगे: Krishivam किसानों, डीलरों और साझेदारों के साथ कैसे काम करती है।',
    gu: 'પેકથી આગળ: Krishivam ખેડૂતો, ડીલરો અને ભાગીદારો સાથે કેવી રીતે કામ કરે છે.',
  },
  'Agricultural Product Solutions': { hi: 'कृषि उत्पाद समाधान', gu: 'કૃષિ ઉત્પાદન ઉકેલો' },
  'The right input for the crop in front of you.': { hi: 'आपकी फसल के लिए सही इनपुट।', gu: 'તમારા પાક માટે યોગ્ય ઇનપુટ.' },
  'Ask us': { hi: 'हमसे पूछें', gu: 'અમને પૂછો' },
  'Dealer & Distributor Support': { hi: 'डीलर और वितरक सहायता', gu: 'ડીલર અને વિતરક સહાય' },
  'Working alongside the partners who carry our range.': { hi: 'हमारे उत्पाद बेचने वाले साझेदारों के साथ मिलकर काम।', gu: 'અમારા ઉત્પાદનો વેચતા ભાગીદારો સાથે મળીને કામ.' },
  'Crop Nutrition Guidance': { hi: 'फसल पोषण मार्गदर्शन', gu: 'પાક પોષણ માર્ગદર્શન' },
  'Matching nutrition to the stage your crop is at.': { hi: 'फसल की अवस्था के अनुसार सही पोषण।', gu: 'પાકના તબક્કા મુજબ યોગ્ય પોષણ.' },
  'Product Knowledge & Technical Support': { hi: 'उत्पाद जानकारी और तकनीकी सहायता', gu: 'ઉત્પાદન જ્ઞાન અને ટેકનિકલ સહાય' },
  'Clear answers on what is in each pack and how to use it.': {
    hi: 'हर पैक में क्या है और उसे कैसे इस्तेमाल करें - इसके साफ़ जवाब।',
    gu: 'દરેક પેકમાં શું છે અને તેનો ઉપયોગ કેવી રીતે કરવો - તેના સ્પષ્ટ જવાબ.',
  },
  'Customized Agricultural Solutions': { hi: 'आपकी ज़रूरत के अनुसार कृषि समाधान', gu: 'તમારી જરૂરિયાત મુજબ કૃષિ ઉકેલો' },
  'Conversations that start from your specific requirement.': { hi: 'बातचीत, जो आपकी ख़ास ज़रूरत से शुरू होती है।', gu: 'વાતચીત, જે તમારી ખાસ જરૂરિયાતથી શરૂ થાય છે.' },
  'Behind every service': { hi: 'हर सेवा के पीछे', gu: 'દરેક સેવા પાછળ' },
  'A portfolio built to be explained.': { hi: 'ऐसी उत्पाद श्रृंखला, जिसे आसानी से समझाया जा सके।', gu: 'એવી ઉત્પાદન શ્રેણી, જે સરળતાથી સમજાવી શકાય.' },
  'Every Krishivam product states what it contains on the pack - which makes guidance straightforward and honest.': {
    hi: 'Krishivam के हर उत्पाद के पैक पर लिखा होता है कि उसमें क्या है - इसलिए सलाह देना सीधा और ईमानदार रहता है।',
    gu: 'Krishivam ના દરેક ઉત્પાદનના પેક પર લખેલું હોય છે કે તેમાં શું છે - તેથી માર્ગદર્શન સીધું અને પ્રામાણિક રહે છે.',
  },
  'Browse products': { hi: 'उत्पाद देखें', gu: 'ઉત્પાદનો જુઓ' },
  'Have a requirement in mind? Tell us about it.': { hi: 'कोई ज़रूरत है? हमें बताइए।', gu: 'કોઈ જરૂરિયાત છે? અમને જણાવો.' },

  // ── Mission ──
  'A clear point of view on better agriculture, responsible farming and long-term agricultural growth.': {
    hi: 'बेहतर कृषि, ज़िम्मेदार खेती और लंबे समय तक कृषि विकास पर एक स्पष्ट सोच।',
    gu: 'વધુ સારી કૃષિ, જવાબદાર ખેતી અને લાંબા ગાળાના કૃષિ વિકાસ અંગે સ્પષ્ટ દૃષ્ટિકોણ.',
  },
  'Our values': { hi: 'हमारे मूल्य', gu: 'અમારાં મૂલ્યો' },
  'Principles that shape the journey.': { hi: 'सिद्धांत, जो हमारी राह तय करते हैं।', gu: 'સિદ્ધાંતો, જે અમારો માર્ગ ઘડે છે.' },
  'Four commitments behind every product we develop and every relationship we build.': {
    hi: 'चार प्रतिबद्धताएँ, जो हमारे हर उत्पाद और हर रिश्ते की नींव हैं।',
    gu: 'ચાર પ્રતિબદ્ધતાઓ, જે અમારા દરેક ઉત્પાદન અને દરેક સંબંધનો પાયો છે.',
  },
  'The direction': { hi: 'हमारी दिशा', gu: 'અમારી દિશા' },
  'Confident enough to innovate.': { hi: 'नया करने का आत्मविश्वास।', gu: 'નવું કરવાનો આત્મવિશ્વાસ.' },
  'Grounded enough to stay useful.': { hi: 'उपयोगी बने रहने की समझ।', gu: 'ઉપયોગી રહેવાની સમજ.' },
  'See the portfolio these principles produced.': { hi: 'इन सिद्धांतों से बनी उत्पाद श्रृंखला देखें।', gu: 'આ સિદ્ધાંતોથી બનેલી ઉત્પાદન શ્રેણી જુઓ.' },
  'Explore the portfolio': { hi: 'उत्पाद श्रृंखला देखें', gu: 'ઉત્પાદન શ્રેણી જુઓ' },

  // ── About ──
  'About Krishivam': { hi: 'Krishivam के बारे में', gu: 'Krishivam વિશે' },
  'An agricultural input and fertilizer company focused on developing and supplying modern agricultural solutions.': {
    hi: 'आधुनिक कृषि समाधान विकसित करने और उपलब्ध कराने पर केंद्रित एक कृषि इनपुट और उर्वरक कंपनी।',
    gu: 'આધુનિક કૃષિ ઉકેલો વિકસાવવા અને પૂરા પાડવા પર કેન્દ્રિત કૃષિ ઇનપુટ અને ખાતર કંપની.',
  },
  'Headquartered in Gujarat': { hi: 'मुख्यालय गुजरात में', gu: 'મુખ્ય કાર્યાલય ગુજરાતમાં' },
  'Product categories': { hi: 'उत्पाद श्रेणियाँ', gu: 'ઉત્પાદન શ્રેણીઓ' },
  'Who we are': { hi: 'हम कौन हैं', gu: 'અમે કોણ છીએ' },
  'Modern agricultural inputs, thoughtfully made.': { hi: 'आधुनिक कृषि इनपुट, सोच-समझकर बनाए गए।', gu: 'આધુનિક કૃષિ ઇનપુટ્સ, વિચારપૂર્વક બનાવેલા.' },
  // Follows the company name: "Krishivam Agriscience Private Limited works across …"
  'works across fertilizer and crop-input categories including organic fertilizers, biostimulants, biofertilizers and speciality liquid fertilizers.': {
    hi: 'जैविक उर्वरक, बायोस्टिमुलेंट, जैव उर्वरक और विशेष तरल उर्वरक सहित उर्वरक और फसल-इनपुट की कई श्रेणियों में काम करती है।',
    gu: 'સેન્દ્રિય ખાતર, બાયોસ્ટિમ્યુલન્ટ, જૈવિક ખાતર અને વિશેષ પ્રવાહી ખાતર સહિત ખાતર અને પાક-ઇનપુટની વિવિધ શ્રેણીઓમાં કામ કરે છે.',
  },
  'Our brand philosophy combines agriculture, science, quality, sustainability and professionalism in one cohesive direction - so every pack is clear about what it contains and what it is for.': {
    hi: 'हमारी ब्रांड सोच खेती, विज्ञान, गुणवत्ता, टिकाऊपन और पेशेवर काम को एक दिशा में जोड़ती है - ताकि हर पैक पर साफ़ लिखा हो कि उसमें क्या है और वह किस काम का है।',
    gu: 'અમારી બ્રાન્ડ વિચારધારા ખેતી, વિજ્ઞાન, ગુણવત્તા, ટકાઉપણું અને વ્યાવસાયિકતાને એક જ દિશામાં જોડે છે - જેથી દરેક પેક પર સ્પષ્ટ હોય કે તેમાં શું છે અને તે શેના માટે છે.',
  },
  'Our belief': { hi: 'हमारा विश्वास', gu: 'અમારી માન્યતા' },
  'Nature’s strength.': { hi: 'प्रकृति की शक्ति।', gu: 'પ્રકૃતિની શક્તિ.' },
  'Science’s': { hi: 'विज्ञान का', gu: 'વિજ્ઞાનનું' },
  'promise.': { hi: 'वादा।', gu: 'વચન.' },
  'What we do': { hi: 'हम क्या करते हैं', gu: 'અમે શું કરીએ છીએ' },
  'Let’s talk about what your crops need.': { hi: 'आइए बात करें कि आपकी फसल को क्या चाहिए।', gu: 'ચાલો વાત કરીએ કે તમારા પાકને શું જોઈએ છે.' },
  'Contact Krishivam': { hi: 'Krishivam से संपर्क करें', gu: 'Krishivam નો સંપર્ક કરો' },

  // ── Contact ──
  'Let’s start a conversation.': { hi: 'आइए, बातचीत शुरू करें।', gu: 'ચાલો, વાતચીત શરૂ કરીએ.' },
  'For product enquiries, dealership conversations and general business enquiries, connect with Krishivam Agriscience.': {
    hi: 'उत्पाद की पूछताछ, डीलरशिप की बात और सामान्य व्यावसायिक जानकारी के लिए Krishivam Agriscience से जुड़ें।',
    gu: 'ઉત્પાદનની પૂછપરછ, ડીલરશિપની વાત અને સામાન્ય વ્યાવસાયિક પૂછપરછ માટે Krishivam Agriscience નો સંપર્ક કરો.',
  },
  'Contact details': { hi: 'संपर्क विवरण', gu: 'સંપર્ક વિગતો' },
  'We’re easy to reach.': { hi: 'हम तक पहुँचना आसान है।', gu: 'અમારો સંપર્ક કરવો સરળ છે.' },
  'Call, write or send the form - the Krishivam team usually replies within one working day.': {
    hi: 'कॉल करें, ईमेल करें या फ़ॉर्म भेजें - Krishivam टीम आमतौर पर एक कार्यदिवस में जवाब देती है।',
    gu: 'કૉલ કરો, ઇમેઇલ કરો કે ફોર્મ મોકલો - Krishivam ટીમ સામાન્ય રીતે એક કામકાજના દિવસમાં જવાબ આપે છે.',
  },
  'Phone': { hi: 'फ़ोन', gu: 'ફોન' },
  'Email': { hi: 'ईमेल', gu: 'ઇમેઇલ' },
  'Office': { hi: 'कार्यालय', gu: 'ઓફિસ' },
  'Fields marked * are required.': { hi: '* वाले खाने भरना ज़रूरी है।', gu: '* વાળાં ખાનાં ભરવાં જરૂરી છે.' },
  'Name *': { hi: 'नाम *', gu: 'નામ *' },
  'Mobile *': { hi: 'मोबाइल *', gu: 'મોબાઇલ *' },
  'Optional - for a written reply.': { hi: 'वैकल्पिक - लिखित जवाब के लिए।', gu: 'વૈકલ્પિક - લેખિત જવાબ માટે.' },
  'Product / Category': { hi: 'उत्पाद / श्रेणी', gu: 'ઉત્પાદન / શ્રેણી' },
  'General enquiry': { hi: 'सामान्य पूछताछ', gu: 'સામાન્ય પૂછપરછ' },
  'Dealership / distribution': { hi: 'डीलरशिप / वितरण', gu: 'ડીલરશિપ / વિતરણ' },
  'Message *': { hi: 'संदेश *', gu: 'સંદેશ *' },
  'Submit enquiry': { hi: 'पूछताछ भेजें', gu: 'પૂછપરછ મોકલો' },
  'Sending…': { hi: 'भेजा जा रहा है…', gu: 'મોકલાઈ રહ્યું છે…' },
  'Your name': { hi: 'आपका नाम', gu: 'તમારું નામ' },
  'Your crop, area, the product you’re interested in…': {
    hi: 'आपकी फसल, क्षेत्र, जिस उत्पाद में आपकी रुचि है…',
    gu: 'તમારો પાક, વિસ્તાર, જે ઉત્પાદનમાં તમને રસ છે…',
  },
  'Please tell us your name.': { hi: 'कृपया अपना नाम बताएँ।', gu: 'કૃપા કરી તમારું નામ જણાવો.' },
  'Enter a 10-digit mobile number.': { hi: '10 अंकों का मोबाइल नंबर डालें।', gu: '10 અંકનો મોબાઇલ નંબર દાખલ કરો.' },
  'That email doesn’t look right.': { hi: 'यह ईमेल सही नहीं लग रहा।', gu: 'આ ઇમેઇલ સાચો લાગતો નથી.' },
  'Add a short message so we can help.': { hi: 'छोटा-सा संदेश लिखें, ताकि हम मदद कर सकें।', gu: 'ટૂંકો સંદેશ લખો, જેથી અમે મદદ કરી શકીએ.' },
  'Thank you - enquiry received.': { hi: 'धन्यवाद - आपकी पूछताछ मिल गई।', gu: 'આભાર - તમારી પૂછપરછ મળી ગઈ.' },
  'The Krishivam team will get back to you shortly. For anything urgent, call': {
    hi: 'Krishivam टीम जल्द ही आपसे संपर्क करेगी। किसी ज़रूरी काम के लिए कॉल करें:',
    gu: 'Krishivam ટીમ ટૂંક સમયમાં તમારો સંપર્ક કરશે. કોઈ તાત્કાલિક કામ માટે કૉલ કરો:',
  },
  'Send another enquiry': { hi: 'एक और पूछताछ भेजें', gu: 'બીજી પૂછપરછ મોકલો' },
  'The enquiry form is being activated - please try again in a few minutes, or': {
    hi: 'पूछताछ फ़ॉर्म चालू किया जा रहा है - कृपया कुछ मिनट बाद फिर कोशिश करें, या',
    gu: 'પૂછપરછ ફોર્મ ચાલુ થઈ રહ્યું છે - કૃપા કરી થોડી મિનિટ પછી ફરી પ્રયાસ કરો, અથવા',
  },
  'Your enquiry couldn’t be sent just now. Please try again, or': {
    hi: 'आपकी पूछताछ अभी नहीं भेजी जा सकी। कृपया फिर कोशिश करें, या',
    gu: 'તમારી પૂછપરછ હમણાં મોકલી શકાઈ નથી. કૃપા કરી ફરી પ્રયાસ કરો, અથવા',
  },
  'Krishivam Agriscience office on Google Maps': { hi: 'Google Maps पर Krishivam Agriscience का कार्यालय', gu: 'Google Maps પર Krishivam Agriscience ની ઓફિસ' },

  // ── Coming soon and 404 ──
  'Coming soon': { hi: 'जल्द आ रहा है', gu: 'ટૂંક સમયમાં' },
  'More is taking shape.': { hi: 'और भी बहुत कुछ आ रहा है।', gu: 'હજુ ઘણું આવી રહ્યું છે.' },
  'New agricultural solutions will be added here as the portfolio expands.': {
    hi: 'उत्पाद श्रृंखला बढ़ने के साथ नए कृषि समाधान यहाँ जोड़े जाएँगे।',
    gu: 'ઉત્પાદન શ્રેણી વધતાં નવા કૃષિ ઉકેલો અહીં ઉમેરાશે.',
  },
  'Stay in touch': { hi: 'जुड़े रहें', gu: 'સંપર્કમાં રહો' },
  'A growing portfolio, carefully considered.': { hi: 'सोच-समझकर बढ़ती उत्पाद श्रृंखला।', gu: 'વિચારપૂર્વક વધતી ઉત્પાદન શ્રેણી.' },
  'Want to hear first when a new Krishivam product launches? Send us a note and we’ll keep you posted.': {
    hi: 'नया Krishivam उत्पाद आते ही सबसे पहले जानना चाहते हैं? हमें संदेश भेजें, हम आपको बताते रहेंगे।',
    gu: 'નવું Krishivam ઉત્પાદન આવે ત્યારે સૌથી પહેલાં જાણવું છે? અમને સંદેશ મોકલો, અમે તમને જાણ કરતા રહીશું.',
  },
  'Not found': { hi: 'पेज नहीं मिला', gu: 'પેજ મળ્યું નથી' },
  'This page has moved.': { hi: 'यह पेज अब यहाँ नहीं है।', gu: 'આ પેજ હવે અહીં નથી.' },
  'The page you’re looking for could not be found. Return to the Krishivam home page or explore the product portfolio.': {
    hi: 'आप जो पेज खोज रहे हैं, वह नहीं मिला। Krishivam के होम पेज पर लौटें या उत्पाद श्रृंखला देखें।',
    gu: 'તમે શોધી રહ્યા છો તે પેજ મળ્યું નથી. Krishivam ના હોમ પેજ પર પાછા જાઓ અથવા ઉત્પાદન શ્રેણી જુઓ.',
  },
  'Back to Home': { hi: 'होम पर लौटें', gu: 'હોમ પર પાછા જાઓ' },
}

/** Text with a number or name inside that a fixed entry can't cover. */
export const PATTERNS: [RegExp, (m: RegExpMatchArray, l: 'hi' | 'gu') => string][] = [
  [/^Call (\+?[\d\s-]+)$/, (m, l) => (l === 'hi' ? `${m[1]} पर कॉल करें` : `${m[1]} પર કૉલ કરો`)],
  [/^Krishivam on (.+)$/, (m, l) => (l === 'hi' ? `${m[1]} पर Krishivam` : `${m[1]} પર Krishivam`)],
]

/** Sentences built around a name (see components/Fill.tsx). */
export const TEMPLATES: Record<string, Tr> = {
  'Why {name}': { hi: '{name} क्यों', gu: '{name} શા માટે' },
  'The {name} family': { hi: '{name} श्रृंखला', gu: '{name} શ્રેણી' },
  'Let’s talk about {name}.': { hi: 'आइए, {name} के बारे में बात करें।', gu: 'ચાલો, {name} વિશે વાત કરીએ.' },
  'No products match “{name}”. Try another name or category.': {
    hi: '“{name}” से कोई उत्पाद नहीं मिला। कोई दूसरा नाम या श्रेणी आज़माएँ।',
    gu: '“{name}” સાથે કોઈ ઉત્પાદન મળ્યું નથી. બીજું નામ કે શ્રેણી અજમાવો.',
  },
}

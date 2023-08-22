import React, { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import languageTranslate from "../data/language.json";

import "../plugins/custom-chapter-plugin.js";
import "../plugins/custom-playlist-plugin.js";
import "../plugins/custom-playlist-popup-plugin.js";
import "../plugins/custom-chapter-seekbar.js";
import "../plugins/custom-language-support.js";
import "../plugins/video-quality-plugin.js";
import "../plugins/custom-annotation-plugin.js";
import "../plugins/custom-hover-over-parser-plugin.js";
import "../plugins/custom-in-screen-navigation-plugin.js";
import "../plugins/custom-external-concept-check-plugin.js";
import "../plugins/custom-timestamp-plugin";
import "../plugins/videojs.framebyframe.js";
import "../plugins/videojs.framebyframe.css";
import "../plugins/custom-caption-plugin.js";
import "../plugins/custom-audio-describe-plugin.js";
import "../plugins/custom-internal-concept-check-plugin.js";
import "../plugins/custom-internal-concept-check.css";
import "../plugins/custom-settings-plugin.js";
import "../plugins/custom-settings.css";
import "../plugins/custom-speed-control-plugin";

// import languages to video player
videojs.addLanguage("es", {
  Playlist: "Playlist",
  Play: "Reproducción",
  Pause: "Pausa",
  "Current Time": "Tiempo reproducido",
  Duration: "Duración total",
  "Remaining Time": "Tiempo restante",
  "Stream Type": "Tipo de secuencia",
  LIVE: "DIRECTO",
  Loaded: "Cargado",
  Progress: "Progreso",
  Fullscreen: "Pantalla completa",
  "Non-Fullscreen": "Pantalla no completa",
  Mute: "Silenciar",
  Unmute: "No silenciado",
  "Playback Rate": "Velocidad de reproducción",
  Subtitles: "Subtítulos",
  "subtitles off": "Subtítulos desactivados",
  Captions: "Subtítulos especiales",
  "captions off": "Subtítulos especiales desactivados",
  Chapters: "Capítulos",
  "Close Modal Dialog": "Cerca de diálogo modal",
  "You aborted the video playback":
    "Ha interrumpido la reproducción del vídeo.",
  "A network error caused the video download to fail part-way.":
    "Un error de red ha interrumpido la descarga del vídeo.",
  "The video could not be loaded, either because the server or network failed or because the format is not supported.":
    "No se ha podido cargar el vídeo debido a un fallo de red o del servidor o porque el formato es incompatible.",
  "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.":
    "La reproducción de vídeo se ha interrumpido por un problema de corrupción de datos o porque el vídeo precisa funciones que su navegador no ofrece.",
  "No compatible source was found for this video.":
    "No se ha encontrado ninguna fuente compatible con este vídeo.",
});
videojs.addLanguage("pt", {
  Play: "Reproduzir",
  Pause: "Parar",
  Replay: "Reiniciar",
  "Current Time": "Tempo Atual",
  Duration: "Duração",
  "Remaining Time": "Tempo Restante",
  "Stream Type": "Tipo de Stream",
  LIVE: "EM DIRETO",
  Loaded: "Carregado",
  Progress: "Progresso",
  Fullscreen: "Ecrã inteiro",
  "Exit Fullscreen": "Ecrã normal",
  Mute: "Desativar som",
  Unmute: "Ativar som",
  "Playback Rate": "Velocidade de reprodução",
  Subtitles: "Legendas",
  "subtitles off": "desativar legendas",
  Captions: "Anotações",
  "captions off": "desativar anotações",
  Chapters: "Capítulos",
  "Close Modal Dialog": "Fechar Janela Modal",
  Descriptions: "Descrições",
  "descriptions off": "desativar descrições",
  "Audio Track": "Faixa Áudio",
  "You aborted the media playback": "Parou a reprodução do vídeo.",
  "A network error caused the media download to fail part-way.":
    "Um erro na rede fez o vídeo falhar parcialmente.",
  "The media could not be loaded, either because the server or network failed or because the format is not supported.":
    "O vídeo não pode ser carregado, ou porque houve um problema na rede ou no servidor, ou porque formato do vídeo não é compatível.",
  "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.":
    "A reprodução foi interrompida por um problema com o vídeo ou porque o formato não é compatível com o seu navegador.",
  "No compatible source was found for this media.":
    "Não foi encontrada uma fonte de vídeo compatível.",
  "The media is encrypted and we do not have the keys to decrypt it.":
    "O vídeo está encriptado e não há uma chave para o desencriptar.",
  "Play Video": "Reproduzir Vídeo",
  Close: "Fechar",
  "Modal Window": "Janela Modal",
  "This is a modal window": "Isto é uma janela modal",
  "This modal can be closed by pressing the Escape key or activating the close button.":
    "Esta modal pode ser fechada pressionando a tecla ESC ou ativando o botão de fechar.",
  ", opens captions settings dialog":
    ", abre janela com definições de legendas",
  ", opens subtitles settings dialog":
    ", abre janela com definições de legendas",
  ", opens descriptions settings dialog":
    ", abre janela com definições de descrições",
  ", selected": ", seleccionado",
  "Skip backward {1} seconds": "Recuar de {1} segundos",
  "Skip forward {1} seconds": "Avançar de {1} segundos",
});
videojs.addLanguage("ar", {
  Play: "تشغيل",
  Pause: "إيقاف",
  "Current Time": "الوقت الحالي",
  Duration: "مدة",
  "Remaining Time": "الوقت المتبقي",
  "Stream Type": "نوع التيار",
  LIVE: "مباشر",
  Loaded: "تم التحميل",
  Progress: "التقدم",
  Fullscreen: "ملء الشاشة",
  "Exit Fullscreen": "تعطيل ملء الشاشة",
  Mute: "صامت",
  Unmute: "غير الصامت",
  "Playback Rate": "معدل التشغيل",
  Subtitles: "الترجمة",
  "subtitles off": "إيقاف الترجمة",
  Captions: "التعليقات",
  "captions off": "إيقاف التعليقات",
  Chapters: "فصول",
  "You aborted the media playback": "لقد ألغيت تشغيل الفيديو",
  "A network error caused the media download to fail part-way.":
    "تسبب خطأ في الشبكة بفشل تحميل الفيديو بالكامل.",
  "The media could not be loaded, either because the server or network failed or because the format is not supported.":
    "لا يمكن تحميل الفيديو بسبب فشل في الخادوم أو الشبكة ، أو فشل بسبب عدم إمكانية قراءة تنسيق الفيديو.",
  "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.":
    "تم إيقاف تشغيل الفيديو بسبب مشكلة فساد أو لأن الفيديو المستخدم يستخدم ميزات غير مدعومة من متصفحك.",
  "No compatible source was found for this media.":
    "فشل العثور على أي مصدر متوافق مع هذا الفيديو.",
  "Play Video": "تشغيل الفيديو",
  Close: "أغلق",
  "Modal Window": "نافذة مشروطة",
  "This is a modal window": "هذه نافذة مشروطة",
  "This modal can be closed by pressing the Escape key or activating the close button.":
    "يمكن غلق هذه النافذة المشروطة عن طريق الضغط على زر الخروج أو تفعيل زر الإغلاق",
  ", opens captions settings dialog": ", تفتح نافذة  خيارات التعليقات",
  ", opens subtitles settings dialog": ", تفتح نافذة  خيارات الترجمة",
  ", selected": ", مختار",
  "Audio Player": "مشغل الصوت",
  "Video Player": "مشغل الفيديو",
  Replay: "إعادة التشغيل",
  "Seek to live, currently behind live":
    "ذهاب إلى نقطة البث المباشر، متأخر عن البث المباشر حاليًا",
  "Seek to live, currently playing live":
    "ذهاب إلى نقطة البث المباشر، البث المباشر قيد التشغيل حاليًا",
  "Progress Bar": "شريط التقدم",
  "progress bar timing: currentTime={1} duration={2}": "{1} من {2}",
  Descriptions: "الأوصاف",
  "descriptions off": "إخفاء الأوصاف",
  "Audio Track": "المسار الصوتي",
  "Volume Level": "مستوى الصوت",
  "The media is encrypted and we do not have the keys to decrypt it.":
    "الوسائط مشفرة وليس لدينا الرموز اللازمة لفك شفرتها.",
  "Close Modal Dialog": "إغلاق مربع الحوار المشروط",
  ", opens descriptions settings dialog": "، يفتح مربع حوار إعدادات الأوصاف",
  "captions settings": "إعدادات التعليقات التوضيحية",
  "subtitles settings": "إعدادات الترجمات",
  "descriptions settings": "إعدادات الأوصاف",
  Text: "النص",
  White: "أبيض",
  Black: "أسود",
  Red: "أحمر",
  Green: "أخضر",
  Blue: "أزرق",
  Yellow: "أصفر",
  Magenta: "أرجواني",
  Cyan: "أزرق سماوي",
  Background: "الخلفية",
  Window: "نافذة",
  Transparent: "شفاف",
  "Semi-Transparent": "نصف شفاف",
  Opaque: "معتم",
  "Font Size": "حجم الخط",
  "Text Edge Style": "نمط حواف النص",
  None: "لا شيء",
  Raised: "بارز",
  Depressed: "منخفض",
  Uniform: "منتظم",
  "Drop shadow": "ظل خلفي",
  "Font Family": "عائلة الخطوط",
  "Proportional Sans-Serif": "Proportional Sans-Serif",
  "Monospace Sans-Serif": "Monospace Sans-Serif",
  "Proportional Serif": "Proportional Serif",
  "Monospace Serif": "Monospace Serif",
  Casual: "Casual",
  Script: "Script",
  "Small Caps": "Small Caps",
  Reset: "إعادة الضبط",
  "restore all settings to the default values":
    "استعادة كل الإعدادات إلى القيم الافتراضية",
  Done: "تم",
  "Caption Settings Dialog": "مربع حوار إعدادات التعليقات التوضيحية",
  "Beginning of dialog window. Escape will cancel and close the window.":
    'بداية نافذة مربع حوار. الضغط على زر "Escape" سيؤدي إلى الإلغاء وإغلاق النافذة.',
  "End of dialog window.": "نهاية نافذة مربع حوار.",
  "{1} is loading.": "{1} قيد التحميل.",
  "Exit Picture-in-Picture": "خرج من وضع صورة داخل صورة",
  "Picture-in-Picture": "صورة داخل صورة",
  "No content": "لا يوجد محتوى",
  Color: "اللون",
  Opacity: "معدل الشفافية",
  "Text Background": "خلفية النص",
  "Caption Area Background": "خلفية منطقة التسمية التوضيحية",
});
videojs.addLanguage("hi", {
  "Audio Player": "ऑडियो प्लेयर",
  "Video Player": "वीडियो प्लेयर",
  Play: "चलाएँ",
  Pause: "रोके",
  Replay: "फिर से चलाएँ",
  "Current Time": "वर्तमान समय",
  Duration: "अवधि",
  "Remaining Time": "शेष समय",
  "Stream Type": "स्ट्रीम प्रकार",
  LIVE: "लाइव",
  "Seek to live, currently behind live":
    "छोड़कर लाइव प्रसारण पर आगे बढ़ें, अभी लाइव प्रसारण से पीछे हैं",
  "Seek to live, currently playing live":
    "छोड़कर लाइव प्रसारण पर आगे बढ़ें, अभी लाइव चल रहा है",
  Loaded: "लोड हुआ",
  Progress: "प्रगति",
  "Progress Bar": "प्रोगेस बार",
  "progress bar timing: currentTime={1} duration={2}": "{2} में से {1}",
  Fullscreen: "फ़ुल स्क्रीन",
  "Exit Fullscreen": "फ़ुल स्क्रीन से बाहर निकलें",
  Mute: "म्यूट करें",
  Unmute: "अनम्यूट करें",
  "Playback Rate": "चलाने की दर",
  Subtitles: "उपशीर्षक",
  "subtitles off": "उपशीर्षक बंद",
  Captions: "कैप्शन",
  "captions off": "कैप्शन बंद",
  Chapters: "अध्याय",
  Descriptions: "विवरण",
  "descriptions off": "विवरण बंद",
  "Audio Track": "ऑडियो ट्रैक",
  "Volume Level": "वॉल्यूम स्तर",
  "You aborted the media playback": "आपने मीडिया प्लेबैक को रोक दिया",
  "A network error caused the media download to fail part-way.":
    "एक नेटवर्क त्रुटि के कारण मीडिया डाउनलोड आंशिक रूप से विफल हो गया।",
  "The media could not be loaded, either because the server or network failed or because the format is not supported.":
    "मीडिया लोड नहीं किया जा सका, या तो सर्वर या नेटवर्क विफल होने के कारण या प्रारूप समर्थित नहीं होने के कारण।",
  "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.":
    "मीडिया प्लेबैक निरस्त कर दिया गया, कारण: दूषण की समस्या या मीडिया ने उन सुविधाओं का उपयोग किया था जिनका आपके ब्राउज़र ने समर्थन नहीं किया।",
  "No compatible source was found for this media.":
    "इस मीडिया के लिए कोई अनुकूल स्रोत नहीं मिला।.",
  "The media is encrypted and we do not have the keys to decrypt it.":
    "मीडिया एन्क्रिप्टेड है और हमारे पास इसे डिक्रिप्ट करने की चाबी नहीं है।",
  "Play Video": "वीडियो चलाएं",
  Close: "बंद करे",
  "Close Modal Dialog": "मोडल डायलॉग बंद करें",
  "Modal Window": "मोडल विंडो",
  "This is a modal window": "यह एक मोडल विंडो है",
  "This modal can be closed by pressing the Escape key or activating the close button.":
    "इस मोडल को एस्केप कुंजी दबाकर या बंद करें बटन को सक्रिय करके बंद किया जा सकता है।",
  ", opens captions settings dialog": ", कैप्शन सेटिंग डायलॉग खोलता है",
  ", opens subtitles settings dialog": ", उपशीर्षक सेटिंग्स संवाद खोलता है",
  ", opens descriptions settings dialog": ", विवरण सेटिंग संवाद खोलता है",
  ", selected": ", चुना गया",
  "captions settings": "कैप्शन सेटिंग",
  "subtitles settings": "उपशीर्षक सेटिंग",
  "descriptions settings": "विवरण सेटिंग",
  Text: "टेक्स्ट",
  White: "सफेद",
  Black: "काला",
  Red: "लाल",
  Green: "हरा",
  Blue: "नीला",
  Yellow: "पीला",
  Magenta: "मैजेंटा",
  Cyan: "सियान",
  Background: "बैकग्राउंड",
  Window: "विंडो",
  Transparent: "पारदर्शी",
  "Semi-Transparent": "अर्द्ध पारदर्शी",
  Opaque: "अपारदर्शी",
  "Font Size": "फ़ॉन्ट आकार",
  "Text Edge Style": "टेक्स्ट एज स्टाइल",
  None: "कोई नहीं",
  Raised: "उठा हुआ",
  Depressed: "उदास",
  Uniform: "वर्दी",
  "Drop shadow": "परछाई",
  "Font Family": "फॉण्ट परिवार",
  "Proportional Sans-Serif": "प्रोपोरशनल साँस-सेरिफ",
  "Monospace Sans-Serif": "मोनोस्पास साँस-सेरिफ",
  "Proportional Serif": "प्रोपोरशनल सेरिफ",
  "Monospace Serif": "मोनोस्पास सेरिफ",
  Casual: "आकस्मिक",
  Script: "स्क्रिप्ट",
  "Small Caps": "छोटे अक्षर",
  Reset: "रीसेट करें",
  "restore all settings to the default values":
    "सभी सेटिंग्स को डिफ़ॉल्ट मानों पर पुनर्स्थापित करें",
  Done: "पूर्ण",
  "Caption Settings Dialog": "कैप्शन सेटिंग्स डायलॉग",
  "Beginning of dialog window. Escape will cancel and close the window.":
    "डायलॉग विंडो की शुरुआत। एस्केप विंडो को रद्द और बंद कर देगा।",
  "End of dialog window.": "संवाद विंडो का अंत।",
  "{1} is loading.": "{1} लोड हो रहा है।",
  "Exit Picture-in-Picture": "पिक्चर-इन-पिक्चर से बाहर निकलें",
  "Picture-in-Picture": "पिक्चर-इन-पिक्चर",
});

export const VideoPlayer = (props) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.id = "video-js";
      videoElement.classList.add("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      options.language = "en";
      if (lang) {
        options.language = lang;
      }

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

      //Use Custom Video Quality Plugin
      player.customVideoQualityChanger(options);

      //Use Custom Language Support Plugin
      player.customLanguageSupport();

      options.settings &&
        player.customSettings(languageTranslate[options.language]);

      options.settings && player.customSpeedControl();
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;

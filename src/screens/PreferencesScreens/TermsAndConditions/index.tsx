import { ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { spacing } from "../../../theme";

const content = `Fit&Lit mobil uygulamasına hoş geldiniz. Bu kullanım şartları, Fit&Lit uygulamasının kullanımına ilişkin kuralları ve hakları tanımlar. Uygulamayı indirerek, kurarak ya da kullanarak bu şartları kabul etmiş sayılırsınız. Eğer bu şartları kabul etmiyorsanız, lütfen uygulamayı kullanmayınız.

Fit&Lit uygulaması en az 16 yaşındaki kullanıcılar içindir. 18 yaşın altındaysanız, uygulamayı kullanmak için ebeveyn izninizin olduğunu beyan etmiş olursunuz.

Fit&Lit, kullanıcıların fitness hedeflerini takip etmelerine, egzersiz ve beslenme planlarını görüntülemelerine ve gelişimlerini izlemelerine yardımcı olmak amacıyla geliştirilmiştir. Uygulama yalnızca kişisel kullanım içindir ve ticari amaçla kullanılamaz. Hesap bilgilerinizin güvenliğinden siz sorumlusunuz. Ayrıca, uygulama üzerinden verdiğiniz bilgilerin doğru ve güncel olduğunu taahhüt etmiş olursunuz. Egzersiz veya diyet programına başlamadan önce bir sağlık profesyoneline danışmanız gerekmektedir.

Uygulamanın bazı bölümleri ücretli abonelik gerektirebilir. Abonelik satın alarak, geçerli ücretlerin sizden tahsil edilmesini kabul etmiş olursunuz. Tüm ödemeler App Store ya da Google Play üzerinden gerçekleştirilir. Abonelikler, iptal edilmediği sürece her fatura döneminde otomatik olarak yenilenir. Fatura döneminin son 24 saatinden önce iptal edilmediği sürece ücret tahsil edilir. Kullanılmayan süreler için geri ödeme yapılmaz.

Fit&Lit bir sağlık hizmeti değildir. Sunulan içerikler sadece bilgilendirme amaçlıdır. Sağlıkla ilgili kararlar almadan önce mutlaka bir doktora danışmanız gerekir. Uygulamayı kullanmanızdan doğabilecek herhangi bir sağlık sorununda sorumluluk tamamen kullanıcıya aittir.

Kullanıcı olarak uygulamaya yüklediğiniz fotoğraflar, yorumlar veya diğer içeriklerin sahibi sizsiniz. Ancak bu içeriklerin uygulama içinde gösterilmesine onay vermiş olursunuz. Uygunsuz, yasa dışı ya da zararlı içerik paylaşmanız durumunda hesabınız askıya alınabilir.

Kişisel verilerinizin gizliliği bizim için önemlidir. Uygulamada topladığımız bilgilerin nasıl kullanıldığı ve korunduğu hakkında bilgi almak için Gizlilik Politikamızı inceleyiniz.

Eğer bu şartlara aykırı davranırsanız ya da uygulamayı kötüye kullanırsanız, hesabınızı askıya alma ya da kalıcı olarak kapatma hakkımız saklıdır.

Kullanım şartları zaman zaman güncellenebilir. Değişikliklerden sizi uygulama içi bildirim ya da e-posta yoluyla haberdar ederiz. Uygulamayı kullanmaya devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.

Her türlü soru ve görüşünüz için support@fitandlit.app adresinden bize ulaşabilirsiniz.`;

const TermsAndConditions = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: spacing.medium,
        paddingTop: spacing.medium,
        paddingBottom: bottom || spacing.large,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          lineHeight: 20,
        }}
      >
        {content}
      </Text>
    </ScrollView>
  );
};

export default TermsAndConditions;

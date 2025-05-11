import { ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { spacing } from "../../../theme";

const content = `Fit&Lit olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu gizlilik politikası, uygulamamız üzerinden toplanan kişisel verilerin nasıl işlendiğini, saklandığını ve korunduğunu açıklar. Uygulamayı kullanarak bu politikayı kabul etmiş olursunuz.

Fit&Lit, kullanıcıdan ad, soyad, e-posta adresi, doğum tarihi, cinsiyet, profil fotoğrafı, telefon numarası, lokasyon bilgisi ve sağlıkla ilgili bazı bilgiler gibi veriler toplayabilir. Bu bilgiler, kullanıcı deneyimini kişiselleştirmek, egzersiz ve beslenme planlarını optimize etmek ve kullanıcıya özel içerikler sunmak amacıyla kullanılır.

Kullanıcıların uygulama içindeki aktiviteleri, tercihleri ve kullanım alışkanlıkları analiz edilerek ürün geliştirme ve kullanıcı desteği sağlamak için istatistiksel olarak değerlendirilebilir. Bu veriler anonimleştirilmiş şekilde üçüncü taraf analiz araçları ile paylaşılabilir.

Toplanan veriler, kullanıcının açık rızası olmaksızın hiçbir şekilde üçüncü şahıslara satılmaz veya ticari amaçla devredilmez. Ancak yasal bir zorunluluk durumunda, ilgili resmi makamlarla paylaşılabilir.

Uygulama üzerinden yapılan ödeme işlemleri, App Store ve Google Play altyapısı üzerinden gerçekleştiğinden ödeme bilgileriniz uygulama tarafından hiçbir şekilde kaydedilmez veya işlenmez.

Fit&Lit, kişisel verilerinizin güvenliğini sağlamak adına güncel yazılım protokolleri ve şifreleme teknolojileri kullanır. Ancak, internet üzerinden yapılan hiçbir veri aktarımının yüzde yüz güvenli olacağı garanti edilemez.

Kullanıcılar, kendileriyle ilgili saklanan verilere erişme, bu verileri düzeltme ya da silinmesini talep etme hakkına sahiptir. Bu talepler için support@fitandlit.app adresinden bize ulaşabilirsiniz.

Uygulama, üçüncü taraf hizmet sağlayıcılar kullanabilir. Bu sağlayıcıların gizlilik politikalarını ayrıca incelemeniz önerilir. Fit&Lit, bu hizmet sağlayıcıların politikalarından sorumlu tutulamaz.

Gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler hakkında kullanıcıya bildirim yapılır. Uygulamanın kullanılmaya devam edilmesi, güncel politikaların kabul edildiği anlamına gelir.

Fit&Lit uygulamasını kullanarak bu gizlilik politikasını kabul ettiğinizi ve verilerinizin bu şartlar altında işlenmesine onay verdiğinizi beyan etmiş olursunuz.`;

const PrivacyPolicy = () => {
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

export default PrivacyPolicy;

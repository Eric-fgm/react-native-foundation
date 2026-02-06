import * as AspectRatio from '@rn-foundation/aspect-ratio';
import { Text } from 'react-native';

export default function AspectRatioExample() {
  return (
    <AspectRatio.Root ratio={16 / 9}>
      <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et laboriosam beatae delectus
        iusto voluptatem vitae asperiores aspernatur, velit amet voluptatibus hic obcaecati saepe
        deleniti ratione, quam illum? Assumenda, laboriosam exercitationem.
      </Text>
    </AspectRatio.Root>
  );
}

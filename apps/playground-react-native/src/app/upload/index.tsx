import {
  createBatchStore,
  MediaUploaderOrchestrator,
  useMediaUploader,
} from '@rn-foundation/media-uploader';
import { Button, Text, View } from 'react-native';

const useUploadStore = createBatchStore('test');

export default function UploadExample() {
  const store = useUploadStore();
  return (
    <MediaUploaderOrchestrator
      store={store}
      uploadBatchFn={async (batch) => {
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000 + 1500));
      }}
      uploadBatchItemFn={async (item, index, batch) => {
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 2500 + 1000));
      }}
      addBatchFn={async (batch) => {
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000 + 1000));
      }}
      onBatchComplete={(batch) => {
        console.log(
          'completed',
          batch.items.map((item) => item.status),
        );
      }}
      onComplete={(batches) => {
        console.log(
          'all batches completed',
          batches.map((batch) => batch.status),
        );
      }}>
      <Inner />
    </MediaUploaderOrchestrator>
  );
}

const Inner = () => {
  const { batches, uploadBatch, cancelUpload, pauseUpload, resumeUpload } = useMediaUploader();
  return (
    <View>
      <Button
        title="New batch"
        onPress={() => {
          uploadBatch([{}, {}, {}, {}]);
          uploadBatch([{}, {}, {}, {}], '1');
          uploadBatch([{}, {}, {}, {}]);
          uploadBatch([{}, {}, {}, {}], '1');
        }}
      />
      <Button title="Cancel" onPress={() => cancelUpload()} />
      <Button title="Pause" onPress={() => pauseUpload()} />
      <Button title="Resume" onPress={() => resumeUpload()} />

      {batches.map((batch) => (
        <View key={batch.id}>
          <Text>
            {batch.id} - {batch.status}
          </Text>
          {batch.items.map((item) => (
            <Text key={item.id} style={{ paddingLeft: 24 }}>
              {item.id} - {item.status}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

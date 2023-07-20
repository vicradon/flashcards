import { pipeline } from "@xenova/transformers";

/**
 * This class uses the Singleton pattern to ensure that only one instance of the
 * pipeline is loaded. This is because loading the pipeline is an expensive
 * operation and we don't want to do it every time we want to translate a sentence.
 */
class TextSimilarityPipeline {
  static task = "sentence-similarity";
  static model = "sentence-transformers/all-MiniLM-L6-v2";
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}

// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
  // Retrieve the similarity search pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  let similiter = await TextSimilarityPipeline.getInstance((x) => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    self.postMessage(x);
  });

  // Actually perform the similarity search
  let output = await similiter(event.data.text, {
    input_text: event.data.input_text,

    // Allows for partial output
    callback_function: (x) => {
      self.postMessage({
        status: "update",
        output: similiter.tokenizer.decode(x[0].output_token_ids, {
          skip_special_tokens: true,
        }),
      });
    },
  });

  // Send the output back to the main thread
  self.postMessage({
    status: "complete",
    output: output,
  });
});

import { Token, Mention } from "@/features/annotation_tool/types";


export const MOCK_TOKENS: Token[] = [
  { id: 1, text: "The", index_in_document: 0, pos_tag: "DT", bio_tag: "B-Actor", sentence_index: 0 },
  { id: 2, text: "MSPN", index_in_document: 1, pos_tag: "NNP", bio_tag: "I-Actor", sentence_index: 0 },
  { id: 3, text: "registers", index_in_document: 2, pos_tag: "VBZ", bio_tag: "B-Activity", sentence_index: 0 },
  { id: 4, text: "the", index_in_document: 3, pos_tag: "DT", bio_tag: "B-Activity_Data", sentence_index: 0 },
  { id: 5, text: "measurement", index_in_document: 4, pos_tag: "NN", bio_tag: "I-Activity_Data", sentence_index: 0 },
  { id: 6, text: "at", index_in_document: 5, pos_tag: "IN", bio_tag: "O", sentence_index: 0 },
  { id: 7, text: "the", index_in_document: 6, pos_tag: "DT", bio_tag: "B-Actor", sentence_index: 0 },
  { id: 8, text: "GO", index_in_document: 7, pos_tag: "NN", bio_tag: "I-Actor", sentence_index: 0 },
  { id: 9, text: ".", index_in_document: 8, pos_tag: ".", bio_tag: "O", sentence_index: 0},
  { id: 10, text: "The", index_in_document: 0, pos_tag: "DT", bio_tag: "B-Actor", sentence_index: 1 },
  { id: 11, text: "MSPN", index_in_document: 1, pos_tag: "NNP", bio_tag: "I-Actor", sentence_index: 1 },
  { id: 12, text: "registers", index_in_document: 2, pos_tag: "VBZ", bio_tag: "B-Activity", sentence_index: 1 },
  { id: 13, text: "the", index_in_document: 3, pos_tag: "DT", bio_tag: "B-Activity_Data", sentence_index: 1 },
  { id: 14, text: "measurement", index_in_document: 4, pos_tag: "NN", bio_tag: "I-Activity_Data", sentence_index: 1 },
  { id: 15, text: "at", index_in_document: 5, pos_tag: "IN", bio_tag: "O", sentence_index: 1 },
  { id: 16, text: "the", index_in_document: 6, pos_tag: "DT", bio_tag: "B-Actor", sentence_index: 1 },
  { id: 17, text: "GO", index_in_document: 7, pos_tag: "NN", bio_tag: "I-Actor", sentence_index: 1 },
  { id: 18, text: ".", index_in_document: 8, pos_tag: ".", bio_tag: "O", sentence_index: 1 }
]

export const MOCK_MENTIONS: Mention[] = [
  { id: 1, tag: "Actor", isShownRecommendation: true, token_ids: [1, 2] },
  { id: 2, tag: "Activity", isShownRecommendation: true, token_ids: [3] },
  { id: 3, tag: "Activity_Data", isShownRecommendation: true, token_ids: [4, 5] },
  { id: 4, tag: "Actor", isShownRecommendation: true, token_ids: [7, 8] },
  { id: 5, tag: "Actor", isShownRecommendation: true, token_ids: [10, 11] },
  { id: 6, tag: "Activity", isShownRecommendation: true, token_ids: [12] },
  { id: 7, tag: "Activity_Data", isShownRecommendation: true, token_ids: [13, 14] },
  { id: 8, tag: "Actor", isShownRecommendation: true, token_ids: [16, 17] }     
]
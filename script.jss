/* Make step2, step3, step4 scrollable */
#step2, #step3, #step4 {
  max-height: 90vh;
  overflow-y: auto;
  padding-right: 10px;
}

/* Custom scrollbar styling */
#step2::-webkit-scrollbar,
#step3::-webkit-scrollbar,
#step4::-webkit-scrollbar {
  width: 10px;
}

#step2::-webkit-scrollbar-track,
#step3::-webkit-scrollbar-track,
#step4::-webkit-scrollbar-track {
  background: #cce6ff; /* light blue track */
  border-radius: 10px;
}

#step2::-webkit-scrollbar-thumb,
#step3::-webkit-scrollbar-thumb,
#step4::-webkit-scrollbar-thumb {
  background: #004080; /* dark blue thumb */
  border-radius: 10px;
}

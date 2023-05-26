const noteColors = [
    'bg-blue-600 text-white',
    'bg-yellow-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-gray-500 text-white',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-blue-500',
    'bg-cyan-500',
  ];

  const colorForNoteByIndex = (index)=>{
    return noteColors[index % noteColors.length];
  }

  export {colorForNoteByIndex}
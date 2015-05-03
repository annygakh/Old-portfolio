public static boolean anagrams (String s1, String s2) {
	
	if (s1.length() != s2.length()){
		return false;
	}
		
	int[] charSet = new int[128];	
	char[] chars = s1.toCharArray();
	int numCompletedInStr2 = 0;
	int numOfUniqueChars = 0;
	
	for (char c: chars) {
		if (charSet[c] == 0)
			++numOfUniqueChars;
		
		charSet[c]++;
	}

	for (int i = 0; i < s2.length(); i++) {
		int c = (int) s2.charAt(i);
		System.out.println(c);
		if (charSet[c] == 0) {
			return false;
		}
		--charSet[c];
		if (charSet[c] == 0) {
			++numCompletedInStr2;
			if (numCompletedInStr2 == numOfUniqueChars) {
				return i == s2.length() - 1;
			}
		}
	}
	return false;
	}
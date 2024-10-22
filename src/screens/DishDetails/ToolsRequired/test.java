    public static int binarySearch(int[] arr, int trai, int phai, int chiMuc) {
        if (trai > phai) {
            //X = 1
            return -(1 + 1);
        }
        int giua = trai + (phai - trai) / 2;
        if (arr[giua] == chiMuc) {
            return giua;
        }i
        if (arr[giua] > chiMuc) {
            return binarySearch(arr, trai, giua - 1, chiMuc);
        }
        return binarySearch(arr, giua + 1, phai, chiMuc);
    }
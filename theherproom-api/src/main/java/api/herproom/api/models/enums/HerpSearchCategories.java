package api.herproom.api.models.enums;

public enum HerpSearchCategories {
    COMMON_NAME,
    SCIENTIFIC_NAME,
    FAMILY;

    public String apply(){
        switch(this) {
            case COMMON_NAME:
                return "common_name";
            case SCIENTIFIC_NAME:
                return "species";
            case FAMILY:
                return "familyetc";
            default:
                throw new UnsupportedOperationException();
        }
    }
}
